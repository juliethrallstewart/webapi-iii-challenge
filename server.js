const express = require('express');

const server = express();

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//routes
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

// global middleware
server.use(express.json());
server.use(logger);

// local middleware

server.use('/posts', postRouter);
server.use('/users', userRouter);
// custom middleware

function logger (req, res, next) {
	console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);

	next();
}

module.exports = server;
