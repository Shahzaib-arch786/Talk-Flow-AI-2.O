const BASE_URL = "http://127.0.0.1:8000";

export async function sendTextToAI(text, token) {
  const res = await fetch(`${BASE_URL}/business-ai/text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  return res.json();
}

export async function sendVoiceToAI(file, token) {
  const formData = new FormData();

  formData.append(
    "file",
    file,
    "voice.webm"
  );

  const res = await fetch("http://127.0.0.1:8000/business-ai/voice", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();

  console.log("VOICE RESPONSE:", data);

  if (!res.ok) {
    throw new Error(data.detail || "Voice request failed");
  }

  return data;
}
