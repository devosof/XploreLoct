import Event from '../models/Event.js';
import ApiError from '../utils/ApiError.js';
import AsyncHandler from '../utils/AsyncHandler.js';
import cloudinary from '../config/cloudinary.js';

export const createEvent = AsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id; // Assuming user ID is set in req.user

    // Upload image to Cloudinary
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const imageUrl = result.secure_url;

    const newEvent = await Event.createEvent(name, description, userId, imageUrl);
    res.status(201).json(newEvent);
});

export const getEvents = AsyncHandler(async (req, res) => {
    const events = await Event.getAllEvents();
    res.status(200).json(events);
});

export const commentOnEvent = AsyncHandler(async (req, res) => {
    const { eventId, comment } = req.body;
    const userId = req.user.id; // Assuming user ID is set in req.user
    const newComment = await Event.addComment(eventId, userId, comment);
    res.status(201).json(newComment);
});
