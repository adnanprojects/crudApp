import jwt from 'jsonwebtoken';
import User from '../models/UserSchema.js';

const auth = async (request, response, next) => {
    const { authorization } = request.headers;
    if (!authorization)
        return response.status(401).json({ message: 'Authorization token not found' });

    try {
        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.SECRET);
        request.user = await User.findById(id);
        next();
    } catch (error) {
        response.status(401).json({ error: error.message });
    }
};

export default auth;