const spawn = require('child_process').spawn;

module.exports = () => {
    return new Promise((resolve, reject) => {
        const process = spawn('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
        let output = '';
        process.stdout.on('data', (data) => {
            output += data;
        });

        process.on('close', (code) => {
            if(code) return reject(new Error(`exited with code ${code}`));
            resolve(output.replace(/\n/, '').trim());
        });
    });
};