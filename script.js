const messageList = document.getElementById('messageList');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const typingIndicator = document.getElementById('typingIndicator');

const botResponses = [{
        name: 'Alice',
        message: "Hey there! How's it going?"
    },
    {
        name: 'Bob',
        message: "What's on your mind today?"
    },
    {
        name: 'Charlie',
        message: "That's interesting! Tell me more."
    },
    {
        name: 'Diana',
        message: "I'm not sure I agree, but I see your point."
    },
    {
        name: 'Eva',
        message: "Wow, I never thought about it that way!"
    },
];

function addMessage(content, sender, isUser = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.classList.add(isUser ? 'user' : 'bot');

    const senderElement = document.createElement('div');
    senderElement.classList.add('sender');
    senderElement.textContent = sender;

    const contentElement = document.createElement('div');
    contentElement.textContent = content;

    messageElement.appendChild(senderElement);
    messageElement.appendChild(contentElement);

    messageList.appendChild(messageElement);
    messageList.scrollTop = messageList.scrollHeight;
}

function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
}

function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
}

function getRandomBotResponse() {
    return botResponses[Math.floor(Math.random() * botResponses.length)];
}

chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
        addMessage(message, 'You', true);
        messageInput.value = '';
        showTypingIndicator();

        setTimeout(() => {
            hideTypingIndicator();
            const botResponse = getRandomBotResponse();
            addMessage(botResponse.message, botResponse.name);
        }, 1000 + Math.random() * 1000);
    }
});

messageInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatForm.dispatchEvent(new Event('submit'));
    }
});