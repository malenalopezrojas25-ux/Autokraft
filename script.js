document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('interactive-btn');
    const outputMessage = document.getElementById('output-message');

    let clickCount = 0;

    const messages = [
        "¡Genial! Has interactuado con la página.",
        "¡Excelente! Cada clic cuenta.",
        "¡Increíble! Sigue explorando.",
        "¡Eres genial! La interacción funciona perfectamente."
    ];

    button.addEventListener('click', () => {
        clickCount++;
        const randomMessage = messages[(clickCount - 1) % messages.length];

        outputMessage.textContent = `${randomMessage} (Clics totales: ${clickCount})`;
        outputMessage.classList.remove('hidden');
    });
});
