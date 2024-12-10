import User from "../models/User.js";

//get all users

export const getUsers = async (req,res)=>{
    try{
        const users = await User.find();
        res.json(users)
    }catch(err){
        res.status(500).json({error: "failed to fetch users"})
    }
}

//create a user
export const createUser = async ( req, res )=>{
    try{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({error:'failed to create user'})
    }
}

export const getUserById = async (req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json({error: "user not found"})
        }
        res.json(user)
    }catch(err){
        res.status(400).json({error:'invalid user ID'})
    }

}

export const updateUser = async ( req, res )=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!updatedUser){
            res.status(404).json({error:"user not found"})
         
        }
        res.json(updatedUser);

    }catch(err){
        res.status(400).json({error:'ifailed to update user'})
    }
}

export const deleteUser = async (req, res )=>{
    try{
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if(deletedUser){
            res.json(deletedUser);
        }else{
            res.status(404).json({error:'user not found'})
        }
    }catch(err){
        res.status(400).json({error: 'failed to delete user'})
    }
} 