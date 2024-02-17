// import http from 'http';

// const server = http.createServer(async (req, res) => {
// 	if (req.url === '/' && req.method === 'GET') {
// 		res.writeHead(200, { 'Content-Type': 'application/json' });
// 		res.write(JSON.stringify({ message: 'hello world!' }));
// 		console.log('hello world!');

// 		res.end();
// 		return;
// 	}

// 	res.writeHead(404, { 'Content-Type': 'application/json' });
// 	res.end(JSON.stringify({ message: 'nope' }));
// });

// const PORT = process.env.PORT || 3000;

// server.listen(PORT, () => {
// 	console.log(`server on ${PORT}`);
// });
import * as dotenv from 'dotenv';
dotenv.config();
import app from './server';

app.listen(3001, () => {
	console.log('Server listening on http://localhost:3001');
});
