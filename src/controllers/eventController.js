// import Event from '../models/event.models.js';
// import ApiError from '../utils/ApiError.js';
// import AsyncHandler from '../utils/AsyncHandler.js';
// import cloudinary from '../config/cloudinary.js';

// export const createEvent = AsyncHandler(async (req, res) => {
//     const { name, description } = req.body;
//     const userId = req.user.id; // Assuming user ID is set in req.user

//     // Upload image to Cloudinary
//     const result = await cloudinary.v2.uploader.upload(req.file.path);
//     const imageUrl = result.secure_url;

//     const newEvent = await Event.createEvent(name, description, userId, imageUrl);
//     res.status(201).json(newEvent);
// });

// export const getEvents = AsyncHandler(async (req, res) => {
//     const events = await Event.getAllEvents();
//     res.status(200).json(events);
// });

// export const commentOnEvent = AsyncHandler(async (req, res) => {
//     const { eventId, comment } = req.body;
//     const userId = req.user.id; // Assuming user ID is set in req.user
//     const newComment = await Event.addComment(eventId, userId, comment);
//     res.status(201).json(newComment);
// });


import Event from '../models/event.models.js';
import { uploadOnCloudinary } from '../utils/Cloudinary.js';
import ApiError  from '../utils/ApiError.js';
import  ApiResponse from '../utils/ApiResponse.js';
import  asyncHandler  from '../utils/AsyncHandler.js';

// Create Event
export const createEvent = asyncHandler(async (req, res) => {
    const { path } = req.file;
    const image = await uploadOnCloudinary(path);
    if (!image) throw new ApiError(500, "Image upload failed");

    const newEvent = await Event.createEvent({ ...req.body, imageUrl: image.url });
    res.status(201).json(new ApiResponse(201, newEvent, "Event created successfully"));
});

// Get Events with Filters
export const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.getAllEvents(req.query);
    res.status(200).json(new ApiResponse(200, events, "Events fetched successfully"));
});

// Get Event by ID
export const getEventById = asyncHandler(async (req, res) => {
    const event = await Event.getEventById(req.params.id);
    if (!event) throw new ApiError(404, "Event not found");
    res.status(200).json(new ApiResponse(200, event, "Event details fetched successfully"));
});

// Add Comment to Event
export const commentOnEvent = asyncHandler(async (req, res) => {
    const { id: eventId } = req.params;
    const { user_id, comment } = req.body;

    if (!user_id || !comment) throw new ApiError(400, "user_id and comment are required");

    const newComment = await Event.addComment(eventId, user_id, comment);
    res.status(201).json(new ApiResponse(201, newComment, "Comment added successfully"));
});

