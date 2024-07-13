import User from '../models/UserSchema.js';
import bcrypt from 'bcryptjs';
import 'dotenv/config.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '10d' });
}

// Register
const registerUser = async (request, response) => {
    const { name, email, password } = request.body;

    if (!name || !email || !password)
        return response.status(400).json({ error: 'All fields are mandatory' });

    const userExist = await User.findOne({ email });
    if (userExist)
        return response.status(401).json({ error: 'User already exist' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const user = await User.create({ name, email, password: hashedPassword });
        const token = createToken(user._id);
        response.status(200).json({ email, token });
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
};

// Login
const loginUser = async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password)
        return response.status(400).json({ error: 'All fields are mandatory' });

    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password))
        return response.status(400).json({ error: 'Incorrect email or password' });

    try {
        const token = createToken(user._id);
        // request.headers.authorization = `Beater ${token}`;
        response.status(200).json({ email, token });
    } catch (error) {
        response.status(400).json({ error: error.message });
    }
};

export { registerUser, loginUser };