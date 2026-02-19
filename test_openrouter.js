const OPENROUTER_API_KEY = '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';

async function testOpenRouter() {
    console.log("Testing OpenRouter with model: google/gemini-2.0-flash-lite-preview-02-05:free");
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Nova Core Test",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": "arcee-ai/trinity-large-preview:free",
                "messages": [
                    { "role": "user", "content": "Hello, are you working?" }
                ],
                "reasoning": {
                    "enabled": true
                }
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error ${response.status}:`, errorText);
        } else {
            const data = await response.json();
            console.log("Success:", data);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testOpenRouter();
