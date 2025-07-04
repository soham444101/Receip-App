import mongoose from "mongoose";


const ReceipScheama = new mongoose.Schema(
    {
        
     title:{
        type:String,
        require:true,
        unique:true,
        trim:true
     }
     ,
     description:{
        type:String,
        require:true,
        unique:true,
     },
     difficulty:{
        type:String,
        enum:['Easy','Medium','Hard'],
        require:true
     },
     user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
     }
    }
    ,{
        timestamps:true
    }
)


export const Receip = mongoose.model('Receip',ReceipScheama);