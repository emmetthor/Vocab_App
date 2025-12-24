const logPanel = document.getElementById('log-panel');
const toggleBtn = document.getElementById('toggle-log');
const clearBtn = document.getElementById('clear-log');
const logBody = document.getElementById('log-body');

toggleBtn.addEventListener('click', () => {
  logPanel.classList.toggle('open');
});

function addLog(level, ...msg) {
    const entry = document.createElement('div');
    entry.classList.add('log-entry', `log-${level}`);

    const time = new Date().toLocaleTimeString();

    const content = `[${level.toUpperCase()}] ` + msg.map(m => {
        if (typeof m === 'object') return JSON.stringify(m);
        return m;
    }).join(' ');

    entry.textContent = content;
    logBody.appendChild(entry);
    logBody.scrollTop = logBody.scrollHeight;
}

export const D = {
    debug: (...msg) => addLog('DEBUG', ...msg),
    info: (...msg) => addLog('INFO_', ...msg),
    warn: (...msg) => addLog('WARN_', ...msg),
    error: (...msg) => addLog('ERROR', ...msg)
};