const { posts } = require("../db/repositories");

const getAllByOffset = async (req, res) => {
  let offset  = 0;
  if(req.params.offset)
  {
    offset = req.params.offset
  }
  else
  {
    offset = req.body.offset
  }
  await posts.getNewsAllByOffset(offset).then((data)=> res.status(200).json(data));
};


const findByData = async (req, res) => {
  const {filter} = req.body || 0;
  await posts.find(filter).then((data)=> res.status(200).json(data));
};


const getData = async (req, res) => {
  const {id} = req.body || 0;
  await posts.getByParams(id).then((data)=> res.status(200).json(data));
};


module.exports = { getAllByOffset, findByData, getData};
