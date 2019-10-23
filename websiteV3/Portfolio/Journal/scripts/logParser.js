function inputParser() {
    let emotions = require('../data/emotions.js').emotions.split('\n');
    const analyzedLogs = require('./analyzer.js');
    const input = analyzedLogs.jsonLogsAnalyzed().input;
    
    for(let i = 0; i < input.length; i++) {
        let currentInp = input[i].split(' ');
        for(let j = 0; j < currentInp.length; j++) {
            if(emotions.indexOf(currentInp[j]) !== -1) {
                console.log('emotions used', currentInp[j]);
            }
        }
    }
    
}

inputParser();