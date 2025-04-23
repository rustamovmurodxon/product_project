import Joi from "joi";

const admin =Joi.object({
    username: Joi.string().min(4).max(20).required(),
    role:Joi.string().valid('superadmin','admin').
    required()
})

export const adminValidator =(data)=>{
    return admin.validate(data);
}