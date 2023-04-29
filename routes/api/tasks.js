const express = require('express');

const { tasks: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');
const validateRequest = require('../../middlewares/tasks/validateRequestData');

const router = express.Router();

router.get('/', auth, validateRequest, ctrl.getAll);
router.post('/', auth, ctrl.postTask);

// router.use("/:contactId", checkContactId);

router.get('/:taskId', auth, ctrl.getById);
router.patch('/:taskId', auth, ctrl.patchTask);
router.delete('/:taskId', auth, ctrl.deleteById);

module.exports = router;
