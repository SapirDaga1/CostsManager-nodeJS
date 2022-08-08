const express = require('express');
const Report = require('../schemas/reportschema');
const router = express.Router();

/**
 * Get a detailed report about a specific month and year, per specific user.
 */
router.get('/get', async function(req, res) {
    // Params of wanted report to fetch
    const userId = req.query.id;
    const reportMonth = req.query.month;
    const reportYear = req.query.year;
    const currentYear = new Date().getFullYear();

    const isMonthValid = (reportMonth >= 1 && reportMonth <= 12);
    const isYearValid = (reportYear >= 1900 && reportYear <= currentYear);

    if(!(isMonthValid && isYearValid)){ // Invalid input
        res.status(400).send('Invalid date input, please try again.');
    } else{
        const monthlyReport = await Report.find({id:userId, month:reportMonth, year:reportYear})
            .catch(error => res.status(400)
                .send('There was a problem retrieving the report. \n' + error));

        // Report exists in DB and was fetched successfully
        if(monthlyReport.length === 1){
            const listOfCosts = monthlyReport[0].listOfCosts;
            console.log(`${listOfCosts} \n\n`
                +`Total sum at ${reportMonth}/${reportYear} is ${monthlyReport[0].totalSum}`
                + ` for user ${userId}.`);
            res.status(200).send(monthlyReport);
        }
        // A report doesn't exist in the collection, create one, save it on the db and show the sum to the user.
        else{
            res.status(404)
                .send(`No report for ${reportMonth}/${reportYear} was found for user ${userId}.`);
        }
    }
});

module.exports = router;