const prismaClient = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new prismaClient.PrismaClient();

async function validateToken(inputToken) {
    try {
        // check if token has expired
        const decodedToken = jwt.decode(inputToken);
        if (decodedToken.exp < Date.now() / 1000) { // Token has expired
            return undefined;
        }

        // Verify the token
        const decoded = jwt.verify(inputToken, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return undefined; // Token is invalid or expired
    }
}

async function refreshToken(oldRefreshToken) {
    try {
        // Verify the refresh token
        const decoded = jwt.verify(oldRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        // Generate new tokens
        const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const newRefreshToken = jwt.sign({ userId: decoded.userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        // Update the userSession in the database
        await prisma.userSession.update({
            where: { OR : [{ refreshToken: null },{refreshToken: oldRefreshToken}] },
            data: { refreshToken: newRefreshToken },
        });

        return { newToken, newRefreshToken };
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
}

async function validateRequest(req) {
    const token = req.session.token; // Assuming the token is stored in the session
    const refToken = req.session.refreshToken; // Assuming the refresh token is stored in the session
    if (!token) {
        if  (refToken) {
            const newTokens = await refreshToken(refToken);
            if (newTokens) {
                req.session.token = newTokens.newToken;
                req.session.refreshToken = newTokens.newRefreshToken;
                return newTokens.newToken; // Token refreshed successfully
            } else {
                return {status:401,res:"Invalid refresh token"}; // Invalid refresh token
            }
        }   
        return {status:401,res:"No token"}; // No token provided
    }

    const decoded = await validateToken(token);
    if (!decoded) {
        if  (refToken) {
            const newTokens = await refreshToken(refToken);
            if (newTokens) {
                req.session.token = newTokens.newToken;
                req.session.refreshToken = newTokens.newRefreshToken;
                return newTokens.newToken; // Token refreshed successfully
            } else {
                return {status:401,res:"Invalid refresh token"}; // Invalid refresh token
            }
        } 
        return {status:401,res:"Token expired"}; // Token is invalid or expired
    }

    return decoded;
}

module.exports = {
    validateToken,
    refreshToken,
    validateRequest
};