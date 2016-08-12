/*jshint node:true*/

var topics = require('./topics.json');

module.exports = function(app) {
  var express = require('express');
  var topicsRouter = express.Router();

  topicsRouter.get('/', function(req, res) {
    res.send({
      'topics': topics.topics
    });
  });

  topicsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  topicsRouter.get('/:id', function(req, res) {
    res.send({
      'topics': {
        id: req.params.id
      }
    });
  });

  topicsRouter.put('/:id', function(req, res) {
    res.send({
      'topics': {
        id: req.params.id
      }
    });
  });

  topicsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  // The POST and PUT call will not contain a request body
  // because the body-parser is not included by default.
  // To use req.body, run:

  //    npm install --save-dev body-parser

  // After installing, you need to `use` the body-parser for
  // this mock uncommenting the following line:
  //
  //app.use('/api/topics', require('body-parser').json());
  app.use('/api/topics', topicsRouter);
};
