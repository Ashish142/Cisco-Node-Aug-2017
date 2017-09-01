var express = require('express');
var router = express.Router();

var taskList = [
	{id : 1, name : 'Watch a movie', isCompleted : false},
	{id : 2, name : 'Fix that bug', isCompleted : true},
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  var viewData = { tasks : taskList };
  res.render('tasks/index', viewData);
});

router.get('/new', function(req, res, next){
	res.render('tasks/new');
});

router.post('/new', function(req, res, next){
	var newTaskName = req.body.newTask;

	var newTaskId = taskList.reduce(function(result, task){
		return result > task.id ? result : task.id
	},0) + 1;

	var newTask = {
		id : newTaskId,
		name : newTaskName,
		isCompleted : false
	};
	taskList.push(newTask);
	res.redirect('/tasks');
})
module.exports = router;
