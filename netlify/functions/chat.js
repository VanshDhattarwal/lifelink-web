exports.handler = async (event) => {
    try {

        // Only allow POST requests
        if (event.httpMethod !== "POST") {
            return {
                statusCode: 405,
                body: JSON.stringify({
                    error: "Method not allowed"
                })
            };
        }

        // Get messages from frontend
        const body = JSON.parse(event.body);
        const messages = body.messages;

        if (!messages || !Array.isArray(messages)) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    error: "Messages are required"
                })
            };
        }

        // Send request to OpenRouter
        const response = await fetch(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                method: "POST",

                headers: {
                    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    model: "openrouter/free",

                    messages: [
                        {
                            role: "system",

                            content: `
You are LifeLink AI, an intelligent assistant for LifeLink,
an Emergency Blood and Plasma Donor Network.

Help users with:
- Blood donation information
- Blood donor requests
- Blood groups
- Plasma information
- LifeLink platform guidance

Rules:
- Be calm, empathetic and helpful.
- Support English, Hindi and Hinglish.
- Reply in the user's language style.
- Do not claim you found real donors or hospitals unless real data is available.
- Do not invent medical information.
- For emergencies, advise contacting emergency services or visiting the nearest hospital.
- Keep answers concise and helpful.
`
                        },

                        ...messages.slice(-10)
                    ]
                })
            }
        );

        const data = await response.json();

        // Handle OpenRouter errors
        if (!response.ok) {

            console.error("OpenRouter error:", data);

            return {
                statusCode: response.status,

                body: JSON.stringify({
                    error:
                        data.error?.message ||
                        "AI service error"
                })
            };
        }

        // Get AI response
        const reply =
            data.choices?.[0]?.message?.content ||
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

            body: JSON.stringify({
                error: "Something went wrong."
            })
        };
    }
};