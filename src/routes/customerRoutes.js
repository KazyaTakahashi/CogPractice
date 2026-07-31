const express = require('express');
const customerController = require('../controllers/customerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => customerController.getAll(req, res));
router.get('/:id', (req, res) => customerController.getById(req, res));
router.post('/', (req, res) => customerController.create(req, res));
router.put('/:id', (req, res) => customerController.update(req, res));
router.delete('/:id', (req, res) => customerController.delete(req, res));

module.exports = router;