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

router.post('/', validateUser, (req, res) => {
    const newUser = req.body

    db.insert(newUser)
        .then(user => {
            res.status(201).json(user)
        })
        .catch(e => {
            res.status(500).json({error: 'error adding new user to database'})
        })
});

router.get('/:id', validateUserId, (req, res) => {
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

router.put('/:id', validateUserId, (req, res) => {
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

function validateUserId (req, res, next) {
    let id = req.params.id
    let user = {}
    db.getById(id)
        .then(result => {
            if (result) {
                user = req.user;
                console.log('user validated')
            } else {
                res.status(404).json({ message: "invalid user id" })
            }
        })
        .catch(e => {
            res.status(500).json({error: 'error accessing specified user in database'})
        })
    

    next()
}

function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function validateUser (req, res, next) {
    const newUser = req.body

    isEmpty(newUser) ? res.status(400).json({ message: "missing user data" }) : 
    !newUser.name ? res.status(400).json({ message: "missing required name field" }) :
    console.log('user validated')

    next()
}


module.exports = router;
