// Elements
const output = document.querySelector('#output');
const cursor = document.querySelector('#cursor');

// Lines to display on load
const bootLines = [
  'Initializing system...',
  'Loading modules...',
  'Welcome, user.',
  'Type "help" for a list of commands.',
];

// Types a single line character by character
function typeLine(text, callback) {
  const line = document.createElement('p');
  output.appendChild(line);
  let i = 0;
  const interval = setInterval(() => {
    line.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback(); // move to next line
    }
  }, 40);
}

// Types all boot lines in sequence
function runBootSequence(lines, index = 0) {
  if (index >= lines.length) return;
  typeLine(lines[index], () => runBootSequence(lines, index + 1));
}
const input = document.querySelector('#cmd-input');

// Define your commands here
const commands = {
  help: 'Available commands: help, about, clear',
  about: 'This is my terminal website.',
  clear: null, // handled separately
};

// Start on page load
runBootSequence(bootLines);

// Listen for Enter key
input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const cmd = input.value.trim().toLowerCase();
    input.value = '';

    // Echo what the user typed
    const echo = document.createElement('p');
    echo.textContent = '> ' + cmd;
    output.appendChild(echo);

    // Handle the command
    if (cmd === 'clear') {
      output.innerHTML = '';
    } else if (commands[cmd]) {
      const response = document.createElement('p');
      response.textContent = commands[cmd];
      output.appendChild(response);
    } else {
      const error = document.createElement('p');
      error.textContent = 'Command not found: ' + cmd;
      output.appendChild(error);
    }

    // Auto-scroll to bottom
    output.scrollTop = output.scrollHeight;
  }
});