const express = require('express');

const router = express.Router();

const db = require('./userDb');


router.get('/', (req, res) => {
	db.get().then(result => {
		res.status(200).json(result);
    })
    .catch(e => {
        res.status(500).json({ error: 'unable to retrieve users from database' });
    })
});

router.post('/:id/posts', (req, res) => {});

router.post('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId (req, res, next) {}

function validateUser (req, res, next) {}

function validatePost (req, res, next) {}

module.exports = router;
