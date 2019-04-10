const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('connectRoom', (box) => {
    socket.join(box);
  });
});

app.use((req, res, next) => {
  req.io = io;

  return next();
});

mongoose.connect('mongodb://beatrizf13:beatrizf13@ds121015.mlab.com:21015/rocketbox', {
  useNewUrlParser: true,
});

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use('/', require('./routes'));

server.listen(process.env.PORT || 3333);
