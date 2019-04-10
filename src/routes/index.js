const express = require('express');

const routes = express.Router();
const multer = require('multer');
const multerConfig = require('../config/multer');

const BoxController = require('../controllers/BoxController');
const FileController = require('../controllers/FileController');

routes.get('/boxes', BoxController.index);
routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.delete('/boxes/:id', BoxController.destroy);

routes.post('/boxes/:id/files', multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
