var express = require('express');
const Movies = require('./movie');
const Person = require('./persons');
const Posts = require('./posts');
const Users = require('./users');
var router = express.Router();

/* GET home page. */

router.post('/movies', function(req, res, next) {
  Movies.getAllByOffset(req, res)
});

router.post('/movies/:offset', function(req, res, next) {
  Movies.getAllByOffset(req, res)
});
router.post('/tv', function(req, res, next) {
  Movies.getTVByOffset(req, res)
});
router.post('/tv/:offset', function(req, res, next) {
  Movies.getTVByOffset(req, res)
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
router.post('/persons/find/:name', function(req, res, next) {
  Person.findByData(req, res)
});


router.post('/news', function(req, res, next) {
  Posts.getAllByOffset(req, res)
});
router.post('/news/find', function(req, res, next) {
  Posts.findNews(req, res)
});
router.post('/news/get', function(req, res, next) {
  Posts.getData(req, res)
});
router.post('/news/:offset', function(req, res, next) {
  Posts.getAllByOffset(req, res)
});


router.post('/users', function(req, res, next) {
  Users.getAllByOffset(req, res)
});
router.post('/users/get', function(req, res, next) {
  Users.getData(req, res)
});


module.exports = router;
