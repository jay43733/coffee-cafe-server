const createError = require("../utils/create-error");
const prisma = require("../config/prisma")

exports.getProduct = async (req,res,next)=>{
    try{
        const allProduct = await prisma.product.findMany({})
        res.json({allProduct})
    }catch(err){
        next(err)
    }
}

