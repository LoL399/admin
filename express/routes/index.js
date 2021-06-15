var express = require('express');
const Movies = require('./movie');
const Person = require('./persons');
var router = express.Router();

/* GET home page. */

router.post('/movies', function(req, res, next) {
  Movies.getAllByOffset(req, res)
});
router.post('/movies/find', function(req, res, next) {
  Movies.findByData(req, res)
});
router.post('/movies/get', function(req, res, next) {
  Movies.getData(req, res)
});


router.post('/persons', function(req, res, next) {
  Person.getAllByOffset(req, res)
});
router.post('/persons/find', function(req, res, next) {
  Person.findByData(req, res)
});
router.post('/persons/get', function(req, res, next) {
  Person.getData(req, res)
});



module.exports = router;
