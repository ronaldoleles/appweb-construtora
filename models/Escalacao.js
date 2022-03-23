const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Escalacao = new Schema({

  categoria:{
      type: Schema.Types.ObjectId,
      ref: "categorias" 
      
    },
  obra:{
    type: Schema.Types.ObjectId,
    ref: "obras" 
    
  },
  total:{
      type: Number,
      default: 0
    },
  numeroDiarias:{
      type: Number,
      default: 0
    },
  escalado:{
    type: Boolean,
    default: false
  },
  checkSegundaM:{
    type: String,
    default: "unchecked"
  },
   checkSegundaT:{
    type: String,
    default: "unchecked"
  },
  checkTercaM:{
    type: String,
    default: "unchecked"
  },
  checkTercaT:{
    type: String,
    default: "unchecked"
  },
  checkQuartaM:{
    type: String,
    default: "unchecked"
  },
  checkQuartaT:{
    type: String,
    default: "unchecked"
  },
  checkQuintaM:{
    type: String,
    default: "unchecked"
  },
  checkQuintaT:{
    type: String,
    default: "unchecked"
  },
  checkSextaM:{
    type: String,
    default: "unchecked"
  },
  checkSextaT:{
    type: String,
    default: "unchecked"
  },
  checkSabadoM:{
    type: String,
    default: "unchecked"
  },
  checkSabadoT:{
    type: String,
    default: "unchecked"
  },
  checkDomingoM:{
    type: String,
    default: "unchecked"
  },
  checkDomingoT:{
    type: String,
    default: "unchecked"
  },
  verifica:{
    type: Number,
  default: 0
  },
    data:{
    type: Date,
    default: Date.now()
  }

})

mongoose.model("escalacoes",Escalacao)
