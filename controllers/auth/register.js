const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");

const { createVerifyEmail, sendEmail } = require("../../helpers");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email already in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = nanoid();

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });

    newUser.verificationToken = verificationToken;
    await newUser.save();

    const verifyEmail = createVerifyEmail(verificationToken, email);
    await sendEmail(verifyEmail);

    res.status(201).json({
      status: "success",
      code: 201,
      date: {
        user: {
          email: newUser.email,
          subscription: newUser.subscription,
        },
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = register;
