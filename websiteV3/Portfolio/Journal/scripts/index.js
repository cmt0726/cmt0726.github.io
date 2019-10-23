function log() {
    const readline = require('readline');
    const fs = require('fs');
    const logJson = require('../data/logs.json');
    const http = require('http');

    const rl = readline.createInterface({
        input : process.stdin,
        output: process.stdout
    });

    const options = {
        host: 'localhost',
        path: '/',
        port: '3000'
    };

    rl.question('Notes for today?\n', (answer) => {
        const req = http.get(options, (res) => {
        
            var bodyChunks = [];
            res.on('data', (chunk) => {

                bodyChunks.push(chunk);

            }).on('end', () => {

                var body = Buffer.concat(bodyChunks);
                console.log('BODY: ' + body);
                let log = {
                    date : new Date(),
                    input: answer
                };
                logJson[body] = log
                
                let sLogJson = JSON.stringify(logJson);
                fs.writeFile('../data/logs.json', sLogJson, 'utf8', (err) => {
                
                    if(err) throw err;
                    
                })
                rl.question('Rate out of 10?\n', (answer2) => {
                    if(answer2 <= 10 && answer2 >= 0) {
                        log['rating'] = answer2;
                        logJson[body] = log;
                        
                        
                        sLogJson = JSON.stringify(logJson);
                        fs.writeFile('../data/logs.json', sLogJson, 'utf8', (err) => {
                            if(err) throw err;
                            console.log('Rating Saved!');
                        })
                    } else {
                        console.log('Rating Has to be between 0 - 10')
                    }
                    rl.close();
                })
                
            });
        });
        
        req.on('error', (e) => {
            throw new e;
        })
    })
};

module.exports.log = log