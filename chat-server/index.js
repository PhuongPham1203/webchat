var cors = require('cors')
let express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

let app = express();

// Start use cors
app.use(cors());
// End use cors

// Start connect DB
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var dbConn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'webchat',
});

dbConn.connect();
// End connect DB	

// Start API
// sign in
app.post("/signin", function (req, res) {
	dbConn.query('SELECT * FROM user_account where username = ? and password = ?', [req.body.username, req.body.password], function (error, results, fields) {
		if (error) {
			return res.send({ error: true, data: results, message: error.message });
		}
		let returnData = null;

		if (results.length > 0) {
			returnData = {
				username: results[0].username,
				publicKeyUser: results[0].password
			}
		}
		
		return res.send({ error: false, data: returnData, message: 'success' });
	});
});

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	console.error(err.message, err.stack);
	res.status(statusCode).json({ message: err.message });
	return;
});
// End API

// Start Socket
let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

io.on('connection', (socket) => {
	socket.on('join', (data) => {
		socket.join(data.room);
		socket.broadcast.to(data.room).emit('user joined');
	});

	socket.on('message', (data) => {
		io.in(data.room).emit('new message', { user: data.user, message: data.message });
	});
});
// End Socket

// run listen port
server.listen(port, () => {
	console.log(`started on port: ${port}`);
});