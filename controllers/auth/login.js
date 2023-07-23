const bcrypt = require("bcrypt");
const { increaseLoginAttempts } = require("../../utils/authUtils");
const jwt = require("jsonwebtoken");

const { User } = require("../../models/user");
const HttpError = require("../../helpers/HttpError");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!user || !passwordCompare) {
      await increaseLoginAttempts(email);
      throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw HttpError(401, `Verification not confirmed`);
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
      status: "success",
      code: 200,
      data: {
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = login;
