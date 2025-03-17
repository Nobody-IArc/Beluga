const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./config/dbConnect');
const router = require('./routes/router').router;
const publicRouter = require('./routes/router').publicRouter;
const authenticate = require('./middleware/authenticate');
const socket = require('./middleware/socketHandler');
const setUpSocket = require("./middleware/socketHandler");
const http = require("node:http");

dotenv.config();
const app = express();
const server = http.createServer(app);

connectDB().then(console.log).catch(console.error);

const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', publicRouter);
app.use(authenticate);
app.use('/home', router);

const io = setUpSocket(server);

app.listen(port, () => {
   console.log(`Listening on port ${port}`);
});