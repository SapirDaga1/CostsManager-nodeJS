const express = require('express');
const Cost = require('../schemas/costschema');
const Report = require('../schemas/reportschema');
const User = require('../schemas/userschema');
const {flatten} = require("express/lib/utils");
const router = express.Router();

/**
 * Add a new cost into the 'costs' collection into the database.
 * Return a corresponding message if any error occurs.
 */
router.post('/add', async function(req, res) {
    const userId = req.body.id;
    const costSum = req.body.sum;
    const costDate = new Date(req.body.date);

    let isValidSum = true;
    let isValidUser = true;
    let isValidDate = true;
    let message = '';   // message to user if there was any problem with the inputs

    // Check if the sum is positive number
    if(costSum <= 0){
        isValidSum = false;
        message = 'Cost sum must be greater than 0.';
    }

    // Check if the user already exist in the users collection
    const user = await User.find({id:userId});
    if(user.length < 1){
        isValidUser = false;
        message = 'The user does not exist in the system.';
    }

    if(isNaN(costDate)){ // If the inputted date is not valid
        isValidDate = false;
        message = 'Invalid date input.';
    }
    const costYear = costDate.getFullYear();
    const costMonth = costDate.getMonth() + 1;

    if(isValidSum && isValidUser && isValidDate){

        const cost = new Cost({id:userId, description:req.body.description,
            sum:costSum, date:req.body.date, category:req.body.category});

        // Check if there's an existing report of this specific month and year
        const report = await Report.find({id:userId, month:costMonth, year:costYear});

        // Creating a template for a cost to be included in a future report
        let costConcatenation = `\n${req.body.description} --- category: ${req.body.category}, `
            + `sum: ${costSum}`;

        if(report.length === 1){ // If there's already a report for the corresponding month and year
            // Calculating the new sum of the monthly report
            const oldSum = Number.parseFloat(report[0].totalSum);
            const sumToAdd = Number.parseFloat(costSum);
            const updatedSum = oldSum + sumToAdd;

            // Concatenating the current cost into the list of costs
            let currentListOfCosts = report[0].listOfCosts;
            currentListOfCosts.push(costConcatenation);

            await Report.findOneAndUpdate({id:userId, month:costMonth, year:costYear},
                {totalSum:updatedSum, listOfCosts:currentListOfCosts});

        } else{ // If there isn't any report regarding this date
            const monthlyReport = new Report({id:userId, month:costMonth, year:costYear,
                totalSum:costSum, listOfCosts:costConcatenation});

            monthlyReport.save()
                .catch(error => res.status(400).send('There was a problem saving the report. \n' + error));
        }

        // Saving the new cost into DB.
        await cost.save().then(user => res.status(201).json(user + '\n\n Cost saved successfully!'))
            .catch(error => res.status(400).send('There was a problem saving the cost. \n' + error));
    } else{ // Found error in the inputs
    res.status(404).send(message); }
});

/**
 * Fetch all costs from DB, if none exists, get a corresponding message.
 */
router.get('/getall', async function(req, res) {
    const costs = await Cost.find({});

    if(costs.length === 0){
        res.status(404).send('There aren\'t any saved costs');
    }else{
        res.status(200).send(costs);
    }
});

// Mapping a router and all logic that's required to map into specific endpoint.
module.exports = router;