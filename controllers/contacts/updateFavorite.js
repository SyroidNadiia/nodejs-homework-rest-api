const { Contact } = require("../../models/contact");

const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const favorite = req.body;

  try {
    const result = await Contact.findByIdAndUpdate(id, favorite, { new: true });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
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

module.exports = updateFavorite;
