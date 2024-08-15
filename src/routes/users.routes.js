import { Router } from 'express';
import { userModel } from '../dao/mongoDB/models/user.model.js';

const router = Router();

router.get("/", async (req, res) => {

    try {

        const users = await userModel.find();

        res.status(200).json({ status: "success", payload: users });
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: "Error", msg: "Internal server error"})
    }
    
});

router.get("/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        if(!user) return res.status(400).json({status: "Error", msg: "user not found"});

        res.status(200).json({ status: "success", payload: user });
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: "Error", msg: "Internal server error"})
    }
    
});

router.post("/", async (req, res) => {

    try {

        const userData = req.body;
        const user = await userModel.create(userData);

        res.status(200).json({ status: "success", payload: user });
        
    } catch (error) {
        console.log(`Error: ${error.message}`);
        res.status(500).json({status: "Error", msg: "Internal server error"})
    }
    
});

router.put("/:id", async (req, res) => {

    try {
        const { id } = req.params;
        const body = req.body;
        const user = await userModel.findByIdAndUpdate(id, body);
        const userUpdate = await userModel.findById(id);

        res.status(200).json({ status: "success", payload: userUpdate });
        
    } catch (error) {
        console.log(error);
    }
    
});

router.delete("/:id", async (req, res) => {

    try {
        const { id } = req.params;

        const user = await userModel.deleteOne({_id: id});

        res.json({ status: "success", payload: "Alumno eliminado con éxito" });
        
    } catch (error) {
        console.log(error);
    }
    
});

export default router;