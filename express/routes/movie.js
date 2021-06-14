const { products } = require("../db/repositories");

const getAllByOffset = async (req, res) => {
  const {offset} = req.body || 0;
  await products.getAllByOffset(offset).then((data)=> res.status(200).json(data));
};

module.exports = { getAllByOffset };
