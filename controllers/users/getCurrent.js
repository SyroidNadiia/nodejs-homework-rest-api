const HttpError = require("../../helpers/HttpError");

const getCurrent = async (req, res, next) => {
  try {
    const user = req.user;

    if (!user) {
       throw HttpError(401);
    }

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = getCurrent;
