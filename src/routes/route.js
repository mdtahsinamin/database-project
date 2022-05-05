const express = require('express');
const { helloGet, createAdmin,isAdmin } = require('../controllers/adminController');
const { enrollCourse, clientReview, customers, reviews } = require('../controllers/clientController');
const { customerEnrollment } = require('../controllers/enrollmentController');
const {createService, services} = require('../controllers/serviceController')
const router = express.Router();


router.get('/hello-get', helloGet);
router.post('/create-admin',createAdmin);
router.post('/get-admin', isAdmin);
router.post('/create-new-service',createService);
router.post('/client-enrol-course',enrollCourse);
router.post('/client-reviews', clientReview);


router.get('/client-list', customers);
router.get('/customer-reviews',reviews);
router.get('/service-provide', services);
router.get('/client-enrollment', customerEnrollment);
module.exports = router;