const commandInput = document.getElementById('command-input');
const outputArea = document.getElementById('output');
const terminal = document.getElementById('terminal');

// Keep the input focused even if the user clicks elsewhere on the screen
document.addEventListener('click', () => {
    commandInput.focus();
});

// Database of commands and their outputs
const commands = {
    'help': `
        Available commands: <br>
        <span class="highlight">about</span>    - Learn more about me <br>
        <span class="highlight">resume</span>   - View my experience and skills <br>
        <span class="highlight">projects</span> - See what I've built <br>
        <span class="highlight">contact</span>  - Get my email and social links <br>
        <span class="highlight">clear</span>    - Clear the terminal screen
    `,
    'about': `
        Howdy! My name is Matias Tupinamba. I'm an engineering student at Texas A&M!
    `,
    'contact': `
        Email: tupinambam2006@gmail.com <br>
        GitHub: github.com/matiastup <br>
        LinkedIn: linkedin.com/in/matias-tupinamba
    `
};

// Listen for the Enter key
commandInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const userInput = commandInput.value.trim().toLowerCase();
        
        // Print what the user typed
        printEcho(commandInput.value);
        
        // Process the command
        processCommand(userInput);
        
        // Clear the input field
        commandInput.value = '';
        
        // Scroll to the bottom of the terminal
        terminal.scrollTop = terminal.scrollHeight;
    }
});

function printEcho(input) {
    const echoDiv = document.createElement('div');
    echoDiv.className = 'command-echo';
    echoDiv.innerHTML = `<span class="prompt">user@portfolio:~$</span> ${input}`;
    outputArea.appendChild(echoDiv);
}

function processCommand(command) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'message';

    if (command === '') {
        return; 
    } else if (command === 'clear') {
        outputArea.innerHTML = '';
        return;
    } else if (command === 'resume') {
        window.open('resume.pdf', '_blank');
        responseDiv.innerHTML = 'Opening resume.pdf in a new tab...';
    } else if (command === 'projects') {
        // Build the HTML for the interactive projects menu
        responseDiv.innerHTML = `
            Here are my recent projects. Click to expand: <br>
            
            <button type="button" class="collapsible">[+] Example Project 1</button>
            <div class="content">
                <p>Example Projects Description</p>
                <img src="https://via.placeholder.com/500x250/0f0f0f/00ff00?text=Weather+App+Screenshot" alt="Example Image">
                <p><strong>Tech Stack:</strong> Things used..</p>
                <a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" style="color: #ffcc00;">View Live</a> | <a target="_blank" href="https://github.com/matiastup" style="color: #ffcc00;">GitHub</a>
            </div>

            <button type="button" class="collapsible">[+] Example Project 2</button>
            <div class="content">
                <p>Example description</p>
                <img src="https://via.placeholder.com/500x250/0f0f0f/00ff00?text=E-commerce+Screenshot" alt="Example Image">
                <p><strong>Tech Stack:</strong> Things used..</p>
                <a target="_blank" href="#" style="color: #ffcc00;">View Live</a> | <a target="_blank" href="https://github.com/matiastup" style="color: #ffcc00;">GitHub</a>
            </div>
        `;
        
        // Append it to the terminal first so the elements exist on the page
        outputArea.appendChild(responseDiv);

        // Now, find the buttons we just created and add the click logic
        const collapsibles = responseDiv.querySelectorAll('.collapsible');
        collapsibles.forEach(button => {
            button.addEventListener('click', function() {
                // Toggle the [+] and [-] text
                if (this.innerText.startsWith('[+]')) {
                    this.innerText = this.innerText.replace('[+]', '[-]');
                } else {
                    this.innerText = this.innerText.replace('[-]', '[+]');
                }
                
                // Toggle the visibility of the content div right below the button
                const content = this.nextElementSibling;
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }

                // Scroll terminal to bottom to accommodate new content size
                terminal.scrollTop = terminal.scrollHeight;
            });
        });
        return; // Exit the function early since we already appended the div

    } else if (commands[command]) {
        responseDiv.innerHTML = commands[command];
    } else {
        responseDiv.innerHTML = `Command not found: <span class="highlight">${command}</span>. Type 'help' for a list of commands.`;
    }

    // Append standard text responses
    outputArea.appendChild(responseDiv);
}