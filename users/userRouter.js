const express = require('express');

const router = express.Router();

const db = require('./userDb');


router.get('/', (req, res) => {
	db.get().then(result => {
		res.status(200).json(result);
    })
    .catch(e => {
        res.status(500).json({ error: 'error retrieving users from database' });
    })
});

router.post('/:id/posts', (req, res) => {

});

router.post('/', (req, res) => {
    const newUser = req.body

    db.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(e => {
            res.status(500).json({error: 'error adding new user to database'})
        })
});

router.get('/:id', (req, res) => {
    const { id } = req.params
    console.log('get by id', id)
    db.getById(id)
        .then(user => {
            console.log(user)
            if (user === undefined) {
                return res.status(404).json({message: 'user with specified id not found'})
            } 
            res.status(200).json(user)
        })
        .catch(e => {
            res.status(500).json({error: 'error retrieving user by id from database'})
        })
});

router.get('/:id/posts', (req, res) => {
    const userId = req.params.id

    db.getUserPosts(userId)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({message: 'specified user id not found'})
        }
        res.status(200).json(posts)
    })
    .catch(e => {
        res.status(500).json({error: 'error getting posts from server'})
    })

});

router.delete('/:id', (req, res) => {
    const { id } = req.params

    db.remove(id)
        .then(result => {
            if (result) {
                res.status(200).json(result)
            }
            else {
                res.status(404).json({message: 'the specified user id was not found'})
            }
        })
        .catch(e => {
            res.status(500).json({error: 'error removing user from database'})
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body

    db.update(id, changes)
        .then(updatedUser => {
            res.status(200).json(updatedUser)
        })
        .catch(e => {
            res.status(500).json({ error: 'error in server updating the database'})
        })
});

//custom middleware

function validateUserId (req, res, next) {}

function validateUser (req, res, next) {}

function validatePost (req, res, next) {}

module.exports = router;
