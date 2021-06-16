const { products } = require("../db/repositories");

const getAllByOffset = async (req, res) => {
  const {offset} = req.body || 0;
  await products.getAllByOffset(offset).then((data)=> res.status(200).json(data));
};


const findByData = async (req, res) => {
  const {filter} = req.body || 0;
  await products.find(filter).then((data)=> res.status(200).json(data));
};


const getData = async (req, res) => {
  const {id} = req.body || 0;
  await products.getByParams(id).then((data)=> res.status(200).json(data));
};


module.exports = { getAllByOffset, findByData, getData};
