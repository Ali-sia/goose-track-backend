const express = require('express');

const { columns: ctrl } = require('../../controllers');
const { auth } = require('../../middlewares');

const router = express.Router();

router.get('/', auth, ctrl.getAllColumns);
router.post('/', auth, ctrl.createColumn);

router.patch('/:id', auth, ctrl.changeColumn);
router.delete('/:id', auth, ctrl.deleteColumn);

module.exports = router;
