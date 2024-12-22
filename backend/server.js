import express from 'express';
import http from 'http';
import WebSocket from 'ws';
import cors from 'cors';
import dotenv  from 'dotenv';
import commonRouter from "./routers/commonRouter.js";
import postRouter from "./routers/Posts.js";
import productsRouter from "./routers/Products.js";
import webSettingRouter from "./routers/WebSetting.js";
import authRouter from "./routers/auth.js";
import paymentRouters from "./routers/paymentRouters.js";
import inventoryRouter from "./routers/inventoryRouter.js";
import usersRouter from "./routers/usersRouter.js";
import commonLogRouter from "./routers/commonLogRouter.js";
import Razorpay from "razorpay";

dotenv.config();
const app = express();
const host = 'localhost'
const port = 4021;
const server = http.createServer(app);
const clients = {};

setupWebSocket();
function setupWebSocket() {
    const getUniqueID = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return s4() + s4() + '-' + s4();
    };
    const wsServer = new WebSocket.Server({server});
    const sendMessage = (jsonData,connection) => {
        // We are sending the current data to all connected clients
        Object.keys(clients).map((client) => {
            if(jsonData.objectId === 'open' && clients[client] !== connection){
                clients[client].send(JSON.stringify(jsonData));
            }
        });
    }
    wsServer.on('connection', function(connection) {
        const userID = getUniqueID();
        clients[userID] = connection;
        connection.on('message', function(message) {
            let dataToSend = JSON.parse(message);
            sendMessage(dataToSend);
        })
    })
}

export const paymentGateway = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.urlencoded({ extended: true,limit: '250mb' }));

app.use(express.json({limit: '250mb'}));

///////// USER API GET ////////////////
app.use('/api-call/common', commonRouter);
///////// USER API GET ////////////////
///////// BlogPost GET ////////////////
app.use('/api-call/posts', postRouter);
app.use('/api-call/products', productsRouter);
app.use('/api-call/web-setting', webSettingRouter);
app.use('/api-call/auth', authRouter);
app.use('/api-call/payment', paymentRouters);
app.use('/api-call/inventory', inventoryRouter);
app.use('/api-call/users', usersRouter);
app.use('/api-call/common-log', commonLogRouter);
///////// BlogPost api GET ////////////////
app.get('/api-call', (req, res) => {
    res.status(200).send({message:`Node Server is ready port ${port}`});
});

app.use((err, req, res,next) => {
    res.status(500).send({ message: err.message });
});

server.listen(port,host, function() {
    console.log('[ SOCKET SERVER CONNECTED TO PORT ]',port);
})

