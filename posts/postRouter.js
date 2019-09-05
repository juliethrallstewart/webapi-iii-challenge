const express = require('express');

const router = express.Router();

const db = require('./postDb');

router.get('/', (req, res) => {
    db.get()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(e => {
            res.status(500).json({error: "error retrieving posts from database"})
        })
});

router.post('/:id', validatePost, (req, res) => {
    const { id } = req.params
    const post = req.body;
    post.user_id = id
    console.log(post)

    db.insert(post)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(e => {
            res.status(500).json({error: 'error adding new post to db'})
        })

});

router.get('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware
function isEmpty(obj) {
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function validatePost (req, res, next) {
    const newPost = req.body

    isEmpty(newPost) ? res.status(400).json({ message: "missing post data" }) : 
    !newPost.text ? res.status(400).json({ message: "missing required text field" }) :
    console.log('post validated')

    next()
}

function validatePostId (req, res, next) {}

module.exports = router;
