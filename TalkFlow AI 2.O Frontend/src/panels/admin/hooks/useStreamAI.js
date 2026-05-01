export const streamAI = async (text, onChunk, token) => {
  const res = await fetch("http://127.0.0.1:8000/business-ai/text-stream", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  const reader = res.body.getReader();
  const decoder = new TextDecoder();

  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;

    const chunk = decoder.decode(value);
    onChunk(chunk);
  }
};