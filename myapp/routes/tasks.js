var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/tasks', function(req, res, next) {
  res.send('task page');
});

module.exports = router;