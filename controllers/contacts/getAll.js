const  service = require("../../service");

const getAll = async (req, res, next) => {
  try {
    const result = await service.getAllContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: result,
      },
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = getAll;
