import express from 'express';
import app from './api/index'
const server: express.Application = express();
import dotenv from 'dotenv'
dotenv.config();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const cors = require('cors');

server.use(express.json());
server.use(express.urlencoded({extended: true}));

server.use(cors());

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const routers = app;

server.use('/api', routers);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(new Date() + `Server running on port ${port}`);
});

