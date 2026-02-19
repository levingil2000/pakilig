async function loadLentenApp() {
    try {
        // 1. Fetch the JSON data
        const response = await fetch('messages.json');
        const messages = await response.json();

        const linksContainer = document.getElementById('nav-links-container');
        const titleEl = document.getElementById('msg-title');
        const dateEl = document.getElementById('msg-date');
        const bodyEl = document.getElementById('msg-body');
        const cardEl = document.getElementById('content-card');

        // 2. Function to display the selected message
        const showMessage = (index) => {
            const data = messages[index];
            
            cardEl.style.opacity = 0; // Quick fade out
            
            setTimeout(() => {
                titleEl.textContent = data.title;
                dateEl.textContent = `${data.day} • ${data.date}`;
                bodyEl.textContent = data.body;
                cardEl.style.opacity = 1; // Fade back in
            }, 300);

            // Update active state in sidebar
            document.querySelectorAll('.nav-link').forEach((link, i) => {
                link.classList.toggle('active', i === index);
            });
        };

        // 3. Build the Sidebar dynamically
        messages.forEach((msg, index) => {
            const btn = document.createElement('a');
            btn.href = "#";
            btn.className = 'nav-link';
            btn.innerHTML = `<span>${msg.day}</span><br><small>${msg.title}</small>`;
            
            btn.onclick = (e) => {
                e.preventDefault();
                showMessage(index);
            };
            
            linksContainer.appendChild(btn);
        });

        // 4. Auto-load the very last message (The most recent one)
        showMessage(messages.length - 1);

    } catch (error) {
        console.error("Error loading messages:", error);
        document.getElementById('msg-body').textContent = "Click a day to load the message.";
    }
}

// Start the app
loadLentenApp();