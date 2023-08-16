import jwt from 'jsonwebtoken';

const generateToken = (res, userId)=>{
    const token = jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        {expiresIn: '30d'}
    );
    //SET JWT as HTTP-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'delevopment',
        sameSite: 'strict',
        maxAge: 30 * 60 * 24 * 60 * 1000, // 30 days         
    });
}

export default generateToken;