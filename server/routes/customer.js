const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');


//customer routes
router.get('/', customerController.homepage);
router.get('/about', customerController.about);
router.get('/add', customerController.addcustomer);
router.post('/add', customerController.postcustomer);
router.get('/view/:id', customerController.view);
router.get('/edit/:id', customerController.edit);
router.put('/edit/:id', customerController.editPost);
router.delete('/edit/:id', customerController.deleteCustomer);

module.exports = router;