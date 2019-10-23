module.exports.graph = () => {    
    const grapher = require('asciichart');

    const analyzedData = require('./analyzer.js');
    //setTimeout(() => {
        console.log(grapher.plot(analyzedData.jsonLogsAnalyzed().rating))
    //}, 10000)
    
};