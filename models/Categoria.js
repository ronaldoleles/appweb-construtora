const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Categoria = new Schema({
  nome: {
    type: String,
    required: true
  },
  cpf:{
    type: Number,
    required: true
  },
  telefone:{
    type: Number,
    required: true
  },
  funcao:{
    type: String,
    required: true
  },
  salario:{
    type: Number,
    required: true
  },
  escalado:{
    type: Boolean,
    default: false
  },
obra:{
      type: Schema.Types.ObjectId,
      ref: "obras" 
      
    },
  date:{
    type: Date,
    default: Date.now()
  }
})

mongoose.model("categorias", Categoria)