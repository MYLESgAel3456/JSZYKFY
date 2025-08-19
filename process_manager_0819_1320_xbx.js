// 代码生成时间: 2025-08-19 13:20:24
// Main namespace for process manager
const ProcessManager = (function() {
    // Private variables and functions
    const processes = []; // Stores the list of processes

    // Public API
    return {
        addProcess: addProcess,
        removeProcess: removeProcess,
        updateProcess: updateProcess,
        render: render
    };

    // Function to add a new process
    function addProcess(name) {
        if (!name) {
            console.error('Error: Process name cannot be empty.');
            return;
        }
        if (processes.find(p => p.name === name)) {
            console.error(`Error: Process with name '${name}' already exists.`);
            return;
        }
        const process = { id: Date.now(), name, running: true };
        processes.push(process);
        render();
    }

    // Function to remove a process
    function removeProcess(id) {
        const index = processes.findIndex(p => p.id === id);
        if (index === -1) {
            console.error('Error: Process not found.');
            return;
        }
        processes.splice(index, 1);
        render();
    }

    // Function to update process state
    function updateProcess(id, running) {
        const process = processes.find(p => p.id === id);
        if (!process) {
            console.error('Error: Process not found.');
            return;
        }
        process.running = running;
        render();
    }

    // Function to render the process list
    function render() {
        d3.select('#processes').selectAll('div').remove();
        processes.forEach(process => {
            const processDiv = d3.select('#processes').append('div');
            processDiv.text(process.name + (process.running ? ' (Running)' : ' (Stopped)'));
            processDiv.append('button')
                .text('Remove')
                .on('click', () => removeProcess(process.id));
            processDiv.append('button')
                .text('Toggle')
                .on('click', () => updateProcess(process.id, !process.running));
        });
    }
})();

// Initialize the process manager
d3.select('#add-process-button').on('click', () => {
    const processName = d3.select('#process-name-input').property('value');
    ProcessManager.addProcess(processName);
});

// Add example processes
document.addEventListener('DOMContentLoaded', () => {
    ProcessManager.addProcess('Process 1');
    ProcessManager.addProcess('Process 2');
    ProcessManager.updateProcess('Process 2', false);
});