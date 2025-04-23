import Admin from "../models/admin.model.js";

import { catchError } from "../utils/error-response.js";

import { adminValidator } from "../utils/admin.validation.js";

export class AdminController{
    async createAdmin(req,res){
        try {
            const {error,value}=adminValidator(req.body)
            if(error){
                throw new Error(`Error on creating admin:${error}`)
            }
            const { username,role}=value;
            const newAdmin=await Admin.create({
                username,role
            })
            return res.status(201).json({
                statusConde:201,
                message:"success",
                data:newAdmin
            })
        } catch (error) {
            catchError(error,res)
        }
    }

    async getAllAdmins(req,res){
        try {
            const admins =await Admin.find();
            return res.status(200).json({
                statusConde:200,
                message:"success",
                data:admins
            })
        } catch (error) {
            catchError(error,res)
        }
    }
    async getAllAdminById(req,res){
        try {
            const id=req.params.id;
            const admin=await Admin.findById(id)
            if(!admin){
                throw new Error('Admin not found')
            }
            return res.status(200).json({
                statusConde:200,
                message:"success",
                data: admin
            })
        } catch (error) {
            catchError(error,res)
        }
    }

async updateAdminById(req,res){
    try {
        const id=req.params.id;
        const admin=await Admin.findById(id)
        if(!admin){
            throw new Error("admin not found")
        }
        const updateAdmin = await Admin.findByIdAndUpdate(id,req.body,{new:true})
        return res.status(200).json({
            statusConde:200,
            message:"success",
            data: updateAdmin
        })
    } catch (error) {
        catchError(error,res)
    }
}

    async deleteAdminById(req,res){
        try {
            const id=req.params.id;
            const admin=await Admin.findById(id)
            if(!admin){
                throw new Error('Admin not found')
            }
            await Admin.findByIdAndDelete(id)
            return res.status(200).json({
                statusConde:200,
                message:"success",
                data:{}
            })
        } catch (error) {
            catchError(error,res)
        }
    }

    async signinAdmin(req,res){
        try {
            const {username}=req.body;
            const admin=await Admin.findone({username})
            if(!admin){
                throw new Error("Admin not found")
            }
            return res.status(200).json({
                statusConde:200,
                message:"success",
                data: {}
            })
        } catch (error) {
            catchError(error,res)
        }
    }

}