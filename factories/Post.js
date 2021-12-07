const models = require('./../models');
const post = models.Post;
const schema  = {
    "title" : {
        "exists":{
            "errorMessage":"Blog title is required"
        }
    },
    "description" : {
        "exists":{
            "errorMessage":"Blog description is required"
        }},
    "author" : {
            "exists":{
                "errorMessage":"Blog should have an author"
            }
    }
};
const create = async(reqBody)=>{
    const { title, description, author  } = reqBody;
    var params = {
    title : title,
    description : description,
    author : author
    };
  try {
    const created_post = await post.create(params);
    return { "statusCode" : 201,"data" : created_post }
    } catch(e){
        return { "statusCode" : 500,"data" : { "error" : { "msg" : e } } }
    }
    };

const fetchAll = async()=>{
        try {
            const posts = await post.findAll({});
            //console.log({"statusCode":200,"data":users});
            return {"statusCode":200,"data":posts};
        } catch(e){
            return {"statusCode":500,"data":{ "error" : { "msg" : e } }};
        }
        
    };
const fetch = async(...args)=>{
        try {
            const pst = await post.findByPk(args[0]);
            return { "statusCode" : 200,"data" : pst }
        } catch(e){
            return { "statusCode" : 500, "data" : {"error" : { "msg" : e }} }
        }
    }; 
    const update = async(...args)=>{
        const id = args[0];
        const { title, description, author } = args[1];
  
  try {
    const pst = await post.findByPk(id);  
    pst.title = title == null ? pst.title : title;
    pst.description = description == null ? pst.description : description;
    pst.author = author == null ? pst.author : author;
    pst.save();
    return { "statusCode" : 200, "data" : pst };
    
  } catch(e){
    return { "statusCode" : 500, "data":{ "error" : { "msg" : e } } };
  }
    };
const del = async(...args)=>{
        const id = args[0];
        const pst = await post.findByPk(id);
        try {
          await pst.destroy();
          return { "statusCode" : 202, "data" : {"deleted":true} };
        } catch(err){
            return { "statusCode" : 500, "data":{ "error" : { "msg" : e } } };
        }    
    }
module.exports.del = del;
module.exports.update = update;    
module.exports.fetch = fetch;       
module.exports.fetchAll = fetchAll;    
module.exports.create = create;    
module.exports.schema = schema;