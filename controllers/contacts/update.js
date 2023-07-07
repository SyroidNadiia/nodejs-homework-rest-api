const { Contact } = require("../../models/contact");

const update = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const result = await Contact.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });

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

module.exports = update;
