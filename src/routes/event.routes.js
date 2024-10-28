import express from 'express';
import { createEvent, getEvents, commentOnEvent } from '../controllers/eventController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Set up multer for file uploads

router.post('/', authenticate, upload.single('image'), createEvent);
router.get('/', getEvents);
router.post('/comment', authenticate, commentOnEvent);

export default router;
