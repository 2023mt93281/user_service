const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { refreshToken } = require("./sessionService");
const prisma = new PrismaClient();

exports.registerUser = async (userData) => {
  const hash = await bcrypt.hash(userData.password, 10);
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      passwordHash: hash,
      fullName: userData.fullName,
      status: 'active',
    },
  });
  return user;
};

exports.loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) throw new Error("Invalid password");
  const token = jwt.sign({ id: user.id.toString() }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  const refToken = jwt.sign(
    { id: user.id.toString() },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  return { token: token, refreshToken: refToken };
};

exports.getUserProfile = async (id) => {
  response = await prisma.user.findUnique({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      passwordHash: false,
      fullName: true,
      profilePicture: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: false,
      addresses: {
        select: {
          id: true,
          addressLine1: true,
          addressLine2: true,
          city: true,
          state: true,
          country: true,
          postalCode: true,
        },
      },
      preferences: {
        select: {
          id: true,
          dietaryRestrictions: true,
        },
      },
    },
    where: { id: Number(id) },
    // include: { addresses: true, preferences: true },
  });
  return response;
};
