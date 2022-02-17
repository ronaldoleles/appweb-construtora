const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Postagem = new Schema({
    obra:{
      type: Schema.Types.ObjectId,
      ref: "obras",
      required: true

    },
    categoria:{
      type: Schema.Types.ObjectId,
      ref: "categorias",
      required: true

    },
    data:{
      type: Date,
      default: Date.now()
    }
})

mongoose.model("postagens",Postagem)