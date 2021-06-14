var express = require('express');
const { getAllByOffset } = require('./movie');
var router = express.Router();

/* GET home page. */

router.post('/movies', function(req, res, next) {
  getAllByOffset(req, res)
});

module.exports = router;
