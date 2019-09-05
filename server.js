const express = require('express');
const helmet = require('helmet');

const secrets = require('./config/secrets');

console.log('environment:', secrets.environment);

const server = express();
// server.use(helmet());


server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

//routes
const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

// global middleware
server.use(express.json());
server.use(logger);
server.use(helmet());


// local middleware

server.use('/posts', postRouter);
server.use('/users', userRouter);
// custom middleware

function logger (req, res, next) {
	console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get('Origin')}`);

	next();
}

module.exports = server;
