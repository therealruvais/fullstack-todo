const express = require("express");
const { getTasks, postTasks, updateTasks, deleteTasks, getSingleTask } = require("../Controller/taskCntrlr");
const router = express.Router()


router.get('/', getTasks)
router.post('/', postTasks)
router.get('/:id', getSingleTask)
router.patch('/:id', updateTasks)
router.delete('/:id', deleteTasks )


module.exports = router