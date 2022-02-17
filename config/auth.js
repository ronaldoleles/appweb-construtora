const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
mongoose.Promise = global.Promise;
//model de usuario
require("../models/Usuario")
const Usuario = mongoose.model("usuarios")

//configuração do sistema de autenticação
module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email',passwordField:'senha'},(email,senha,done)=>{
      Usuario.findOne({email: email}).then((usuarios)=>{
        if(!usuarios){
          return done(null,false,{message:"Esta consta não existe!"})
        }
        bcrypt.compare(senha,usuarios.senha,(erro,batem)=>{
          if(batem){
            return done(null,usuarios)
          }else{
            return done(null,false,{message:"Senha incorreta!"})
          }
        })
      })
    }))

    passport.serializeUser((usuarios,done)=>{
      done(null, usuarios.id)
    })

    passport.deserializeUser((id,done)=>{
      Usuario.findById(id,(err,usuarios)=>{
        done(err,usuarios)
      })
    })
}