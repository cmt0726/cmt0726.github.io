const dailyLog = require('./index.js');
const analyzedLogs = require('./analyzer.js');
const graph = require('./graph.js');
dailyLog.log();
if(process.argv.indexOf('-graph') !== -1) {
    console.log(graph.graph(analyzedLogs.jsonLogsAnalyzed().rating));
}
if(process.argv.indexOf('-input') !== -1) {
    let tempInput = analyzedLogs.jsonLogsAnalyzed().input;
    for(let i in tempInput) {
        console.log(tempInput[i]);
    }
    //console.log(analyzedLogs.jsonLogsAnalyzed().input);
}
