const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const { User } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");

const { sendEmail } = require("../../helpers");
const { BASE_URL } = process.env;

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

    const templatePath = path.join(
      __dirname,
      "..",
      "..",
      "views",
      "verifyEmailTemplate.hbs"
    );

    const emailTemplate = fs.readFileSync(templatePath, "utf-8");
    const compiledTemplate = handlebars.compile(emailTemplate);

    const verificationLink = `${BASE_URL}/api/auth/verify/${verificationToken}`;
    const emailContent = compiledTemplate({ verificationLink });

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: emailContent,
    };

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
