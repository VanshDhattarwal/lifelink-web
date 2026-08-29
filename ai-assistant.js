/* ==========================================
   LIFELINK AI ASSISTANT
   CHATBOX SYSTEM
========================================== */


/* ==========================================
   SETTINGS
========================================== */

let currentLanguage = "english";

let conversationHistory = [];


let isSpeaking = false;

async function sendMessage() {

    const input =
        document.getElementById("userInput");

    const text =
        input.value.trim();


    if (text === "") {
        return;
    }


    // Show user message
    addUserMessage(text);


    // Save conversation
    conversationHistory.push({
        role: "user",
        content: text
    });


    // Clear input
    input.value = "";


    // Show typing
    showTyping();


    try {

        const response =
            await fetch("/.netlify/functions/chat", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    messages:
                        conversationHistory

                })

            });


        const data =
            await response.json();


        removeTyping();


        if (!response.ok) {

            addAIMessage(
                "⚠️ Sorry, I'm having trouble connecting to the AI service. Please try again."
            );

            console.error(data);

            return;

        }


        const reply =
            data.reply;


        // Show AI response
        addAIMessage(reply);


        // Save AI response
        conversationHistory.push({
            role: "assistant",
            content: reply
        });


        // Keep memory manageable
        if (conversationHistory.length > 20) {

            conversationHistory =
                conversationHistory.slice(-20);

        }


    } catch (error) {

        removeTyping();

        console.error(error);

        addAIMessage(
            "⚠️ Connection error. Please check your internet and try again."
        );

    }

}

/* ==========================================
   ENTER KEY
========================================== */

document
    .getElementById("userInput")
    .addEventListener("keydown", function (event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    });


/* ==========================================
   USER MESSAGE
========================================== */

function addUserMessage(text) {

    const chatBox =
        document.getElementById("chatBox");


    const message =
        document.createElement("div");


    message.className =
        "message user-message";


    message.innerHTML = `

        <div class="message-content">

            <strong>
                You
            </strong>

            <p>
                ${escapeHTML(text)}
            </p>

        </div>

    `;


    chatBox.appendChild(message);


    scrollChat();

}


/* ==========================================
   AI MESSAGE
========================================== */

function addAIMessage(text) {

    const chatBox =
        document.getElementById("chatBox");


    const message =
        document.createElement("div");


    message.className =
        "message ai-message";


    message.innerHTML = `

        <div class="message-icon">
            🤖
        </div>

        <div class="message-content">

            <strong>
                LifeLink AI
            </strong>

            <p>
                ${text}
            </p>

        </div>

    `;


    chatBox.appendChild(message);


    scrollChat();


    // Optional voice response
    speakAI(text);

}


/* ==========================================
   TYPING INDICATOR
========================================== */

function showTyping() {

    const chatBox =
        document.getElementById("chatBox");


    const typing =
        document.createElement("div");


    typing.id = "typingIndicator";


    typing.className =
        "message ai-message";


    typing.innerHTML = `

        <div class="message-icon">
            🤖
        </div>

        <div class="message-content typing">

            <strong>
                LifeLink AI
            </strong>

            <div class="typing-dots">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;


    chatBox.appendChild(typing);


    scrollChat();

}


/* ==========================================
   REMOVE TYPING
========================================== */

function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );


    if (typing) {

        typing.remove();

    }

}


/* ==========================================
   RESPONSE ENGINE
========================================== */

function generateResponse(text) {

    const message =
        text.toLowerCase();


    /* --------------------------
       GREETING
    -------------------------- */

    if (
        message.includes("hello") ||
        message.includes("hi") ||
        message.includes("hey") ||
        message.includes("namaste") ||
        message.includes("नमस्ते")
    ) {

        addAIMessage(
            getGreeting()
        );

        return;

    }


    /* --------------------------
       HOSPITAL
    -------------------------- */

    if (
        message.includes("hospital") ||
        message.includes("hospitals") ||
        message.includes("अस्पताल")
    ) {

        addAIMessage(
            getHospitalResponse()
        );

        return;

    }


    /* --------------------------
       BLOOD
    -------------------------- */

    if (
        message.includes("blood") ||
        message.includes("blood group") ||
        message.includes("blood chahiye") ||
        message.includes("खून") ||
        message.includes("ब्लड")
    ) {

        addAIMessage(
            getBloodResponse()
        );

        return;

    }


    /* --------------------------
       DIRECTIONS
    -------------------------- */

    if (
        message.includes("direction") ||
        message.includes("directions") ||
        message.includes("route") ||
        message.includes("rasta") ||
        message.includes("रास्ता")
    ) {

        addAIMessage(
            getDirectionResponse()
        );

        return;

    }


    /* --------------------------
       EMERGENCY
    -------------------------- */

    if (
        message.includes("emergency") ||
        message.includes("urgent") ||
        message.includes("accident") ||
        message.includes("ambulance") ||
        message.includes("आपातकाल")
    ) {

        addAIMessage(
            getEmergencyResponse()
        );

        return;

    }


    /* --------------------------
       THANK YOU
    -------------------------- */

    if (
        message.includes("thank") ||
        message.includes("thanks") ||
        message.includes("धन्यवाद")
    ) {

        addAIMessage(
            getThankYouResponse()
        );

        return;

    }


    /* --------------------------
       DEFAULT
    -------------------------- */

    addAIMessage(
        getDefaultResponse()
    );

}


/* ==========================================
   LANGUAGE RESPONSES
========================================== */

function getGreeting() {

    if (currentLanguage === "hindi") {

        return `
            Namaste! 🙏<br>
            Main LifeLink AI Assistant hoon.
            Main aapko blood aur nearby hospitals
            ke baare mein help kar sakta hoon.
        `;

    }


    if (currentLanguage === "hinglish") {

        return `
            Namaste! 👋<br>
            Main LifeLink AI hoon.
            Aap mujhse blood, hospitals aur
            directions ke baare mein pooch sakte ho.
        `;

    }


    return `
        Hello! 👋<br>
        I'm the LifeLink AI Assistant.
        I can help you with blood availability,
        nearby hospitals and directions.
    `;

}


/* ==========================================
   HOSPITAL RESPONSE
========================================== */

function getHospitalResponse() {

    if (currentLanguage === "hindi") {

        return `
            🏥 Main aapke aas-paas ke hospitals
            find karne mein help kar sakta hoon.
            <br><br>
            Hum 20 km ke andar hospitals
            search karenge.
        `;

    }


    if (currentLanguage === "hinglish") {

        return `
            🏥 Bilkul! Main aapke nearby
            hospitals find kar sakta hoon.
            <br><br>
            Hum 20 km ke radius mein
            hospitals search karenge.
        `;

    }


    return `
        🏥 Sure! I can help you find nearby
        hospitals within a 20 km radius.
    `;

}


/* ==========================================
   BLOOD RESPONSE
========================================== */

function getBloodResponse() {

    if (currentLanguage === "hindi") {

        return `
            🩸 Bilkul. Aap mujhe blood group
            bataiye, jaise <strong>O+</strong>,
            <strong>A+</strong> ya <strong>B+</strong>.
            <br><br>
            Main matching hospitals
            find karne mein help karunga.
        `;

    }


    if (currentLanguage === "hinglish") {

        return `
            🩸 Bilkul! Bas blood group batao,
            jaise <strong>O+</strong>, <strong>A+</strong>
            ya <strong>B+</strong>.
            <br><br>
            Phir main matching hospitals
            find karne mein help karunga.
        `;

    }


    return `
        🩸 Sure! Tell me the required blood
        group, such as <strong>O+</strong>,
        <strong>A+</strong> or <strong>B+</strong>.
        <br><br>
        I'll help you find matching hospitals.
    `;

}


/* ==========================================
   DIRECTIONS
========================================== */

function getDirectionResponse() {

    if (currentLanguage === "hindi") {

        return `
            🗺️ Main aapko hospital tak
            directions dene mein help kar sakta hoon.
            <br><br>
            Pehle hospital select karein,
            phir <strong>Get Directions</strong>
            button use karein.
        `;

    }


    if (currentLanguage === "hinglish") {

        return `
            🗺️ Hospital select karo aur
            <strong>Get Directions</strong>
            button dabao.
            <br><br>
            Isse aapko hospital tak ka route
            mil jayega.
        `;

    }


    return `
        🗺️ Select a hospital and use the
        <strong>Get Directions</strong> button
        to open the route.
    `;

}


/* ==========================================
   EMERGENCY
========================================== */

function getEmergencyResponse() {

    return `
        🚨 <strong>Emergency?</strong>
        <br><br>
        If someone is in immediate danger,
        contact your local emergency medical
        service or go to the nearest emergency
        department immediately.
        <br><br>
        LifeLink can help you locate nearby
        hospitals and blood resources.
    `;

}


/* ==========================================
   THANK YOU
========================================== */

function getThankYouResponse() {

    if (currentLanguage === "hindi") {

        return "Aapka swagat hai! ❤️ LifeLink aapki madad ke liye yahan hai.";

    }


    if (currentLanguage === "hinglish") {

        return "You're welcome! ❤️ LifeLink hamesha help karne ke liye ready hai.";

    }


    return "You're welcome! ❤️ LifeLink is here to help.";

}


/* ==========================================
   DEFAULT
========================================== */

function getDefaultResponse() {

    if (currentLanguage === "hindi") {

        return `
            Main abhi prototype mode mein hoon.
            🤖<br><br>
            Aap mujhse blood, hospitals,
            emergency ya directions ke baare mein
            pooch sakte hain.
        `;

    }


    if (currentLanguage === "hinglish") {

        return `
            Main abhi prototype mode mein hoon. 🤖
            <br><br>
            Aap blood, hospital, emergency ya
            directions ke baare mein pooch sakte ho.
        `;

    }


    return `
        I'm currently in prototype mode. 🤖
        <br><br>
        You can ask me about blood,
        hospitals, emergencies or directions.
    `;

}


/* ==========================================
   QUICK ACTION
========================================== */

function quickMessage(text) {

    const input =
        document.getElementById(
            "userInput"
        );


    input.value = text;

    sendMessage();

}


/* ==========================================
   LANGUAGE
========================================== */

function setLanguage(language) {

    currentLanguage = language;


    if (language === "hindi") {

        addAIMessage(
            "Language Hindi par set kar di gayi hai. 🇮🇳"
        );

    }


    else if (language === "hinglish") {

        addAIMessage(
            "Done! 😄 Ab hum Hinglish mein baat kar sakte hain."
        );

    }


    else {

        addAIMessage(
            "Language changed to English. 🇬🇧"
        );

    }

}


/* ==========================================
   VOICE INPUT
========================================== */

function startVoice() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert(
            "Voice recognition is not supported in this browser. Please use Google Chrome."
        );

        return;

    }


    const recognition =
        new SpeechRecognition();


    if (currentLanguage === "hindi") {

        recognition.lang = "hi-IN";

    }

    else {

        recognition.lang = "en-IN";

    }


    recognition.continuous = false;

    recognition.interimResults = false;


    recognition.start();


    const mic =
        document.getElementById(
            "micButton"
        );


    mic.innerHTML = "🔴";


    recognition.onresult =
        function(event) {

            const text =
                event.results[0][0]
                    .transcript;


            document.getElementById(
                "userInput"
            ).value = text;


            sendMessage();

        };


    recognition.onend =
        function() {

            mic.innerHTML = "🎙️";

        };


    recognition.onerror =
        function() {

            mic.innerHTML = "🎙️";

            alert(
                "I couldn't hear you. Please try again."
            );

        };

}


/* ==========================================
   AI VOICE
========================================== */

function speakAI(text) {

    if (
        !("speechSynthesis" in window)
    ) {

        return;

    }


    // Remove HTML
    const cleanText =
        text.replace(
            /<[^>]*>/g,
            ""
        );


    const speech =
        new SpeechSynthesisUtterance(
            cleanText
        );


    if (currentLanguage === "hindi") {

        speech.lang = "hi-IN";

    }

    else {

        speech.lang = "en-IN";

    }


    speech.rate = 0.95;

    speech.pitch = 1;


    window.speechSynthesis.cancel();

    window.speechSynthesis.speak(
        speech
    );

}


/* ==========================================
   SCROLL CHAT
========================================== */

function scrollChat() {

    const chatBox =
        document.getElementById(
            "chatBox"
        );


    chatBox.scrollTop =
        chatBox.scrollHeight;

}


/* ==========================================
   HTML SECURITY
========================================== */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent = text;


    return div.innerHTML;

}















