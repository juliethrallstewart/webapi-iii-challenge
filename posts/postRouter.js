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

    db.insert(post)
        .then(newPost => {
            res.status(201).json(newPost)
        })
        .catch(e => {
            res.status(500).json({error: 'error adding new post to db'})
        })

});

router.get('/:id', validatePostId, (req, res) => {
    const { id } = req.params

    db.getById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(e => {
            res.status(500).json({error: 'error getting post from database'})
        })
});

router.delete('/:id', (req, res) => {
    const { id } = req.params
    let postRemoved = {}

    db.getById(id)
        .then(post => {
            postRemoved = post
        })
        .catch(e => {
            res.status(500).json({error: 'error getting post by id'})
        })

    db.remove(id)
        .then(result => {
            res.status(200).json({deleted: [result, postRemoved]})
        })
        .catch(e => {
            res.status(500).json({error: 'error deleting post'})
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    console.log(changes)

    db.update(id, changes)
        .then(updatedPost => {
            res.status(200).json(updatedPost)
        })
        .catch(e => {
            res.status(500).json({error: 'error updating post in database'})
        })
});

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

function validatePostId (req, res, next) {
    let id = req.params.id
    let post = {}
    db.getById(id)
        .then(result => {
            if (result) {
                post = req.post;
                console.log('post validated')
            } else {
                res.status(404).json({ message: "invalid post id" })
            }
        })
        .catch(e => {
            res.status(500).json({error: 'error accessing specified post in database'})
        })
    

    next()
}

module.exports = router;
