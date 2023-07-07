const { User } = require("../../models/user");

const updateSubscription = async (req, res, next) => {
  const { id } = req.params;
  const subscription = req.body;

  try {
    const result = await User.findByIdAndUpdate(id, subscription, {
      new: true,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: {
          email: result.email,
          subscription: result.subscription,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Missing field favorite`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = updateSubscription;
