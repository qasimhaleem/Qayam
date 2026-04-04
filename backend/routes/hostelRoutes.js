const express = require('express');
const { createHostel, getHostels, getHostelById } = require('../controllers/hostelController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .post(protect, createHostel)
    .get(getHostels);

router
    .route('/:id')
    .get(getHostelById);

module.exports = router;
