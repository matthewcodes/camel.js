var fileComponent_from = require('./fileComponentTest_from.js');
var fileComponent_isFileEndpoint = require('./fileComponentTest_isFileEndpoint.js');
var fileComponent_to = require('./fileComponentTest_to.js');
var fs = require('fs');
var mkdirp = require('mkdirp');

describe('fileComponent', function() {

  var originalReadFile;
  var originalWriteFile;
  var originalStat;
  var originalReaddir;
  var originalAccess;
  var originalMkdirp;

  beforeEach(function(){
    originalReadFile = fs.readFile;
    originalWriteFile = fs.writeFile;
    originalStat = fs.stat;
    originalReaddir = fs.readdir;
    originalAccess = fs.access;
    originalMkdirp = mkdirp;

    fs.stat = function (path, callback) {

      var stats = {};
      stats.isDirectory = function () {
        return false;
      };

      callback(undefined, stats);

    };

    fs.access = function (path, callback) {

      callback(undefined);

    };

  });

  afterEach(function(){
    fs.readFile = originalReadFile;
    fs.writeFile = originalWriteFile;
    fs.stat = originalStat;
    fs.readdir = originalReaddir;
    fs.access = originalAccess;
    mkdirp = originalMkdirp;
  });

  describe('#from', function() {
    fileComponent_from.describe();
  });

  describe('#isFileEndpoint', function() {
    fileComponent_isFileEndpoint.describe();
  });

  describe('#to', function() {
    fileComponent_to.describe();
  });

});
