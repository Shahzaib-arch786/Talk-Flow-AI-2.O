import pandas as pd
import joblib

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import Pipeline
from sklearn.pipeline import FeatureUnion
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.metrics import classification_report, accuracy_score
from sklearn.model_selection import cross_val_score
from preprocess import clean_text


# ==========================
# Load Dataset
# ==========================
df = pd.read_csv("app/demo_ai/intent/dataset.csv", encoding="utf-8")
df.columns = df.columns.str.strip()

print("Columns:", df.columns)
print("Total Samples:", len(df))
print("Unique Intents:", df["intent"].nunique())


# ==========================
# Preprocess Text
# ==========================
df["text"] = df["text"].apply(clean_text)

X = df["text"]
y = df["intent"]


# ==========================
# Train/Test Split
# ==========================
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    stratify=y,      # very important
    random_state=42
)


# ==========================
# Feature Engineering
# ==========================

# Word-level TF-IDF
word_vectorizer = TfidfVectorizer(
    analyzer="word",
    ngram_range=(1, 2),
    max_features=10000,
    min_df=1,
    max_df=0.9,
    sublinear_tf=True
)

# Character-level TF-IDF
char_vectorizer = TfidfVectorizer(
    analyzer="char_wb",
    ngram_range=(3, 5),
    max_features=10000
)

# Combine word + character features
model = Pipeline([
    ("features", FeatureUnion([
        ("word_tfidf", word_vectorizer),
        ("char_tfidf", char_vectorizer)
    ])),
    ("clf", LinearSVC(
        C=1.5,
        class_weight="balanced"
    ))
])


# ==========================
# Train Model
# ==========================
model.fit(X_train, y_train)


# ==========================
# Evaluate
# ==========================
y_pred = model.predict(X_test)

print("\nFinal Model Evaluation:\n")
print(classification_report(y_test, y_pred))

accuracy = accuracy_score(y_test, y_pred)
print(f"\nOverall Accuracy: {accuracy * 100:.2f}%\n")

# ==========================
# Cross Validation Accuracy
# ==========================

cv_scores = cross_val_score(model, X, y, cv=5)

print("\nCross Validation Scores:", cv_scores)
print("Average CV Accuracy: {:.2f}%".format(cv_scores.mean() * 100))



# ==========================
# Save Model
# ==========================
joblib.dump(model, "app/demo_ai/intent/model.pkl")

print("Model trained and saved successfully.")
