import mongoose from 'mongoose';

const userSChema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    profession:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
   },
  
},
{
    timestamps: true
});

export default mongoose.model('User', userSChema);