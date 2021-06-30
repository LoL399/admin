const { products } = require("../db/repositories");

const getAllByOffset = async (req, res) => {
  console.log(req.params)
  let offset  = 0;
  if(req.params.offset)
  {
    offset = req.params.offset
  }
  else
  {
    offset = req.body.offset
  }

  
  await products.getAllByOffset(offset,'movie').then((data)=> res.status(200).json(data));
};


const getTVByOffset = async (req, res) => {
  console.log(req.params)
  let offset  = 0;
  if(req.params.offset)
  {
    offset = req.params.offset
  }
  else
  {
    offset = req.body.offset
  }

  
  await products.getAllByOffset(offset,'tv').then((data)=> res.status(200).json(data));
};


const findByData = async (req, res) => {
  const {filter} = req.body || 0;
  await products.find(filter).then((data)=> res.status(200).json(data));
};


const getData = async (req, res) => {
  const {id} = req.body || 0;
  await products.getByParams(id).then((data)=> res.status(200).json(data));
};


module.exports = { getAllByOffset, findByData, getData, getTVByOffset};
