import crypto from 'crypto';
export const PORT=5555;
export const mongodbURL = 'mongodb+srv://riyasgolani:cyrbRhoU8xyWmqgS@cluster0.mbs5qw0.mongodb.net/partypicasso?retryWrites=true&w=majority'
export const JWT_SECRET = crypto.randomBytes(64).toString('hex');