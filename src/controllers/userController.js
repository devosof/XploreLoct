import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import AsyncHandler from '../utils/AsyncHandler.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

export const registerUser = AsyncHandler(async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await User.createUser(username, email, hashedPassword);
      res.status(201).json({ userId: user.user_id, token: generateToken(user.user_id) });
    } catch (error) {
      next(error);
    }
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
