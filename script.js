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
    'resume': `
        Add link to actual resume later...
    `,
    'projects': `
        Fill out projects here..
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
    echoDiv.innerHTML = `<span class="prompt">guest@portfolio:~$</span> ${input}`;
    outputArea.appendChild(echoDiv);
}

function processCommand(command) {
    const responseDiv = document.createElement('div');
    responseDiv.className = 'message';

    if (command === '') {
        return; // Do nothing if they just pressed enter
    } else if (command === 'clear') {
        outputArea.innerHTML = '';
        return;
    } else if (command === 'resume') {
        // This line opens the PDF in a new tab
        window.open('resume.pdf', '_blank');
        responseDiv.innerHTML = 'Opening resume.pdf in a new tab...';
    } else if (commands[command]) {
        responseDiv.innerHTML = commands[command];
    } else {
        responseDiv.innerHTML = `Command not found: <span class="highlight">${command}</span>. Type 'help' for a list of commands.`;
    }

    outputArea.appendChild(responseDiv);
}