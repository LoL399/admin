const { users } = require("../db/repositories");

const getAllByOffset = async (req, res) => {
  const {offset} = req.body || 0;
  await users.getAllByOffset(offset).then((data)=> res.status(200).json(data));
};


const findByData = async (req, res) => {
  console.log(req.params)
  let name  = '';
  if(req.params.name)
  {
    name = req.params.name
  }
  else
  {
    name = req.body.name
  }
  if(name){
    await users.getByParams({name}).then((data)=> res.status(200).json(data));
  } else {
    res.status(200).json({})
  }

};


const getData = async (req, res) => {
  const {id} = req.body || 0;
  await users.getByParams(id).then((data)=> res.status(200).json(data));
};

const getDataByName = async (req, res) => {
  const {id} = req.body || 0;
  await users.getByParams(id).then((data)=> res.status(200).json(data));
};



module.exports = { getAllByOffset, findByData, getData};
