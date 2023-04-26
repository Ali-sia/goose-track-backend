const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swarrerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Goose Track',
      version: '1.0.0',
      description: 'App for tracking registered users tasks',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes/api/*.js'], // files containing annotations as above
};

const openapiSpecification = swaggerJsdoc(options);

require('dotenv').config();

const tasksRouter = require('./routes/api/tasks');
const usersRouter = require('./routes/api/users');
const columnsRouter = require('./routes/api/columns');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/columns', columnsRouter);

app.use('/api-docs', swarrerUI.serve, swarrerUI.setup(openapiSpecification));

app.use((req, res) => {
  res.status(404).json({ message: '404 - Not found' });
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  res.status(status).json({ message: err.message });
});

module.exports = app;
