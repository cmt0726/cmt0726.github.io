module.exports.jsonLogsAnalyzed = () => {
    const journalLogs = require('../data/logs.json');
    let monthDates = [];
    let fullDates = [];
    let rating = [];
    let input = [];
    for(let x in journalLogs) {
        
        //console.log(new Date(journalLogs[x].date).getMonth(), x);
        monthDates.push(new Date(journalLogs[x].date).getMonth())
        rating.push(journalLogs[x].rating);
        fullDates.push(new Date(journalLogs[x].date));
        input.push(journalLogs[x].input)
    }
    let scoreAvg = (rating.reduce((a, b) => parseInt(a) + parseInt(b))/rating.length)
    //console.log('Average daily rating', scoreAvg)

    return {
        dateMonth: monthDates,
        rating: rating,
        avgRating: scoreAvg,
        fullDates: fullDates,
        input: input
    }
}
