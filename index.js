var routeProcessor = require('./modules/processors/routeProcessor.js');
var clone = require('clone');

exports.context = function context() {

  this.routes = [];

  this.addRoute = function(route) {
    this.routes.push(route);
  };

  this.start = function() {

    this.routes.forEach(function(route) {
      routeProcessor.process(route);
    });

  };

};

exports.route = function route() {

  this.queue = [];
  this.hasStarted = false;
  this.message = undefined;
  this.id = undefined;

  this.from = function(uri) {

    if(!uri) {
      throw new Error('Please specify an endpoint uri');
    } else if(this.queue.length > 0) {
      throw new Error('From method should only be called at the start of a route.');
    } else if(!new RegExp('[a-z]{1,}\:\/\/.{1,}').test(uri)) {
      throw new Error('Endpoint uri is not in the correct format');
    }

    this.addToQueue(uri);
    return this;
  };

  this.to = function(uri) {

    if(!uri) {
      throw new Error('Please specify an endpoint uri');
    } else if(this.queue.length === 0) {
      throw new Error('To method should only be called after From.');
    } else if(!new RegExp('[a-z]{1,}\:\/\/.{1,}').test(uri)) {
      throw new Error('Endpoint uri is not in the correct format');
    }

    this.addToQueue(uri);
    return this;
  };

  this.addToQueue = function(uri) {
    this.queue.push(uri);
  };

  this.getNextEndpoint = function() {
    return this.queue.shift();
  };

  this.clone = function() {
    return clone(this);
  };


};
