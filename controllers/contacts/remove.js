const { Contact } = require("../../models/contact");

const remove = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndRemove({ _id: id });
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
        message: `Not found task id: ${id}`,
        data: "Not Found",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = remove;
