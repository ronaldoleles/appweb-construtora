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
    type: String
  },
   checkSegundaT:{
    type: String
  },
  checkTercaM:{
    type: String
  },
  checkTercaT:{
    type: String
  },
  checkQuartaM:{
    type: String
  },
  checkQuartaT:{
    type: String
  },
  checkQuintaM:{
    type: String
  },
  checkQuintaT:{
    type: String
  },
  checkSextaM:{
    type: String
  },
  checkSextaT:{
    type: String
  },
  checkSabadoM:{
    type: String
  },
  checkSabadoT:{
    type: String
  },
  checkDomingoM:{
    type: String
  },
  checkDomingoT:{
    type: String
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
