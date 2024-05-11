const express = require('express');
const app = express();
const riskRoutes = express.Router();

let Risk = require('../model/Risk');

// api to add risk
riskRoutes.route('/add').post(function (req, res) {
    let risk = new Risk(req.body);
    risk.save()
        .then(risk => {
            res.status(200).json({ 'status': 'success', 'mssg': 'risk added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get risks
riskRoutes.route('/').get(function (req, res) {
    Risk.find(function (err, risks) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'risks': risks });
        }
    });
});

// api to get risk
riskRoutes.route('/risk/:id').get(function (req, res) {
    let id = req.params.id;
    Risk.findById(id, function (err, risk) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'risk': risk });
        }
    });
});

// api to update route
riskRoutes.route('/update/:id').put(function (req, res) {
    Risk.findById(req.params.id, function (err, risk) {
        if (!risk) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            risk.loc = req.body.loc;
            risk.severity = req.body.severity;
            risk.media = req.body.media;

            risk.save().then(business => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
riskRoutes.route('/delete/:id').delete(function (req, res) {
    Risk.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = riskRoutes;