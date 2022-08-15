import express from 'express';
import dotenv from 'dotenv';
import mustache from 'mustache-express';
import path from 'path';
import mainRoutes from './routes/index';
import http from 'http';


dotenv.config();

const socketIO = require('socket.io');
const server = express();
const app = http.createServer(server);
const io = socketIO(app);




server.set('view engine', 'mustache');
server.set('views', path.join(__dirname, 'views'));
server.engine('mustache', mustache());

server.use(express.static(path.join(__dirname, '../public')));

server.use(express.urlencoded({extended: true}));

server.use(mainRoutes);

server.use((req, res) =>{
    res.send('Página não encontrada');
});

server.listen(process.env.PORT);


io.on('connection', function(socket:any){
    console.log('ola');
    
  });


  