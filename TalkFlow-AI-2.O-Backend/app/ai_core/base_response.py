import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class BaseResponse:

    def generate(self, system_prompt, messages):

        full_messages = [{"role": "system", "content": system_prompt}]
        full_messages.extend(messages)

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=full_messages,
            temperature=0.7
        )

        return response.choices[0].message.content.strip()
    
    def generate_stream(self, system_prompt, messages):

        full_messages = [{"role": "system", "content": system_prompt}]
        full_messages.extend(messages)

        stream = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=full_messages,
            stream=True,
            temperature=0.7
        )

        for chunk in stream:
            if chunk.choices[0].delta.content:
                yield chunk.choices[0].delta.content