var express = require('express');
var router = express.Router();
const Post = require('../factories/Post');
const { checkSchema, validationResult } = require('express-validator');

router.get('/', async(req, res, next)=>{
  const { statusCode, data } = await Post.fetchAll();
  res.status(statusCode).json(data);
});

router.post('/', checkSchema(Post.schema) ,async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { statusCode , data } = await Post.create(req.body);
    res.status(statusCode).json(data);
  
});

router.get('/:id', async(req, res, next) => {
  const { statusCode , data } = await Post.fetch(req.params.id);
  res.status(statusCode).json(data);
});

router.put('/:id' ,async(req, res, next) => {
  const { statusCode , data } = await Post.update(req.params.id,req.body);
  res.status(statusCode).json(data);
});

router.delete('/:id', async(req, res, next) => {
  const { statusCode , data } = await Post.del(req.params.id);
  res.status(statusCode).json(data);
});

module.exports = router;
