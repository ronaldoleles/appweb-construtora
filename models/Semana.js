const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Semana = new Schema({
    
   
    obra:{
      type: Schema.Types.ObjectId,
      ref: "escalacoes" 
      
    }, 
    categoria:{
      type: Schema.Types.ObjectId,
      ref: "categorias" 
      
    },
    total:{
      type: Number,
      default: 0

    },
    data:{
      type: Date,
      default: Date.now()
    }
})

mongoose.model("semanas",Semana)