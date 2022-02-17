const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Obra = new Schema({
  nomeObra:{
    type: String,
    required: true
  },
  nomeProprietario:{
    type: String,
    required: true
  },
  telefoneProprietario:{
    type: Number,
  },
     categoria:{
      type: Schema.Types.ObjectId,
      ref: "categorias"
     

    },
  data:{
    type: Date,
    default: Date.now()
  }
})
mongoose.model("obras",Obra)