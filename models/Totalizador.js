const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Totalizador = new Schema({

  escalacao:{
    type: Schema.Types.ObjectId,
    ref: "escalacoes" 
    
  },
   semana:{
    type: Schema.Types.ObjectId,
    ref: "semanas" 
    
  },
  obra:{
    type: String,
    required: true
  },
  totalSemanaObra:{
    type: Number
  }, 
  data:{
    type: Date,
    default: Date.now()
  },
})

mongoose.model("totalizadores",Totalizador)