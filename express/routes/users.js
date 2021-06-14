var express = require('express');
const { getAllByOffset } = require('./movie');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });


router.get('/', function(req, res, next) {
  getAllByOffset(req, res)
});


module.exports = router;
