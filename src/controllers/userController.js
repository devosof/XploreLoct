// import User from '../models/User.js';
// import bcrypt from 'bcrypt';
// import { ApiError } from '../utils/ApiError.js';
// import { ApiResponse } from '../utils/ApiResponse.js';
// import { asyncHandler } from '../utils/AsyncHandler.js';
// import generateToken from '../utils/generateToken.js';

// export const registerUser = asyncHandler(async (req, res) => {
//     const { username, email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ username, email, password: hashedPassword });
//     res.status(201).json(new ApiResponse(201, { ...newUser, token: generateToken(newUser.id) }, "User registered successfully"));
// });

// export const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const user = await User.findByEmail(email);
//     if (user && await bcrypt.compare(password, user.password)) {
//         res.status(200).json(new ApiResponse(200, { ...user, token: generateToken(user.id) }, "Login successful"));
//     } else {
//         throw new ApiError(401, "Invalid credentials");
//     }
// });

// export const getUserProfile = asyncHandler(async (req, res) => {
//     const user = await User.findById(req.user.id);
//     if (!user) throw new ApiError(404, "User not found");
//     res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
// });


import User from '../models/User.js';
import bcrypt from 'bcrypt';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/AsyncHandler.js';
import generateToken from '../utils/generateToken.js';

// Register User
export const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
        throw new ApiError(400, "User already exists");
    }
    const newUser = await User.createUser(username, email, hashedPassword);
    res.status(201).json(new ApiResponse(201, { ...newUser, token: generateToken(newUser.user_id) }, "User registered successfully"));
});

// Login User
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
        res.status(200).json(new ApiResponse(200, { ...user, token: generateToken(user.user_id) }, "Login successful"));
    } else {
        throw new ApiError(401, "Invalid credentials");
    }
});

// Get User Profile
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findUserById(req.user.id);
    if (!user) throw new ApiError(404, "User not found");
    res.status(200).json(new ApiResponse(200, user, "User profile fetched successfully"));
});

// Update User Profile
export const updateUserProfile = asyncHandler(async (req, res) => {
    const updatedUser = await User.updateUserProfile(req.user.id, req.body);
    res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated successfully"));
});
