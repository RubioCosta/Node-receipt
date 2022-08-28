import express from 'express';
import dotenv from 'dotenv';
import mustache from 'mustache-express';
import path from 'path';
import mainRoutes from './routes/index';
const socket = require('socket.io');
const http = require('http');


dotenv.config();

const server = express();
const app = http.createServer(server);
export const io = socket(app);




server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());


server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: true}));

server.use(mainRoutes);

server.use((req, res) =>{
    res.send('Página não encontrada');
});

app.listen(process.env.PORT);




  