const express = require('express');

const { tasks: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrl.getAll);
router.post('/', auth, ctrl.postTask);

// router.use("/:contactId", checkContactId);

router.get('/:contactId', auth, ctrl.getById);
router.put('/:contactId', auth, ctrl.patchTask);
router.delete('/:contactId', auth, ctrl.deleteById);

module.exports = router;
