import User from "../models/User.js";

export const create= async (req, res) => {
     try {
        const userData = new User(req.body);

        if(!userData){
            return res.status(400).json({msg: "Error al crear el usuario"});
        }

        const saveData = await userData.save();
        res.status(200).json({msg: "Usuario Creado", saveData});
     } catch (error) {
        res.status(500).json({error : error})
     }
}

export const getAll = async (req, res) => {
    try {
       const userData = await User.find();
       if(!userData){
        return res.status(400).json({ msg: "Error al obtener los usuarios" });
       }
       res.status(200).json({ msg: "Operación exitosa", data: userData }); 
    } catch (error) {
        res.status(500).json({ error: error }) 
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExit = await User.findById(id);
        if(!userExit){
            return res.status(400).json({msg: "Error al obtener el usuario"});
        }
        res.status(200).json(userExit);
    } catch (error) {
        res.status(500).json({error : error}) 
    }
}

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExit = await User.findByIdAndUpdate(id, req.body, {new: true});
        if(!userExit){
            return res.status(400).json({msg: "Usuario no encontrado"});
        }
        res.status(200).json({msg:"Usuario actualizado correctamente"});
    } catch (error) {
        res.status(500).json({error : error}) 
    }
}

export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const userExit = await User.findByIdAndDelete(id);
        if(!userExit){
            return res.status(400).json({msg: "Usuario no encontrado"});
        }
        res.status(200).json(userExit);
    } catch (error) {
        res.status(500).json({error : error}) 
    }
}

