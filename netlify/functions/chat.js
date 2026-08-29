exports.handler = async (event) => {
    try {

        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "Method not allowed"
                })
            };
        }

        // Check API key
        const apiKey = process.env.OPENROUTER_API_KEY;

        if (!apiKey) {
            console.error("OPENROUTER_API_KEY is missing");

            return {
                statusCode: 500,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "API key is not configured on Netlify."
                })
            };
        }

        const body = JSON.parse(event.body || "{}");
        const messages = body.messages;

        if (!messages || !Array.isArray(messages)) {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error: "Messages are required"
                })
            };
        }

        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "https://lifelink-web.netlify.app",
                    "X-Title": "LifeLink AI"
                },

                body: JSON.stringify({
                    model: "openrouter/free",

                    messages: [
                        {
                            role: "system",
                            content: `
You are LifeLink AI, an intelligent emergency blood and hospital assistant.

You help users with:
- Blood donation information
- Blood group information
- Blood donor requests
- Plasma information
- Finding hospitals and blood banks
- LifeLink platform guidance
- Emergency guidance

IMPORTANT RULES:

1. Be calm, helpful and empathetic.
2. Support English, Hindi and Hinglish.
3. Reply in the user's language.
4. Keep responses short and easy to understand.
5. DO NOT use Markdown symbols such as #, **, *, or ---.
6. Use simple plain text.
7. Never claim you found a real donor, hospital, or blood availability unless real data is provided.
8. Do not invent medical facts.
9. You are not a replacement for a doctor.
10. For emergencies in India, advise calling 112 or going to the nearest emergency hospital.
11. Ask for important information such as city, blood group, and urgency when needed.
12. Be friendly and professional.
`
                        },

                        ...messages.slice(-10)
                    ]
                })
            }
        );

        const data = await response.json();

        console.log("OpenRouter status:", response.status);

        if (!response.ok) {

            console.error(
                "OpenRouter error:",
                JSON.stringify(data)
            );

            return {
                statusCode: response.status,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    error:
                        data?.error?.message ||
                        "AI service temporarily unavailable"
                })
            };
        }

        const reply =
            data?.choices?.[0]?.message?.content ||
            "Sorry, I couldn't generate a response.";

        return {
            statusCode: 200,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                reply: reply
            })
        };

    } catch (error) {

        console.error("Function error:", error);

        return {
            statusCode: 500,

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                error: error.message || "Something went wrong"
            })
        };
    }
};