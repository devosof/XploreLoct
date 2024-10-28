import User from '../models/user.models.js';
import ApiError from '../utils/ApiError.js';
import AsyncHandler from '../utils/AsyncHandler.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

export const registerUser = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await User.findUserByUsername(username);
    if (existingUser) {
        throw new ApiError('User already exists', 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser(username, hashedPassword);
    res.status(201).json({ 
        id: newUser.id, 
        username: newUser.username, 
        token: generateToken(newUser.id) 
    });
});

export const loginUser = AsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new ApiError('Invalid credentials', 401);
    }
    res.status(200).json({ 
        id: user.id, 
        username: user.username, 
        token: generateToken(user.id) 
    });
});
