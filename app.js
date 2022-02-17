//carregando módulos
  const express = require('express')
  const handlebars = require('express-handlebars')
  const bodyParser = require("body-parser")
  const app = express()
  const admin = require("./routes/admin")
  const path = require("path")
  const mongoose = require("mongoose")
  const session = require("express-session")
  const flash = require("connect-flash")
  const usuarios = require("./routes/usuario")
  const passport = require("passport")
  require("./config/auth")(passport)
  const db = require("./config/db")
  //configurações
  //sessão
    app.use(session({
      secret: "cursodenode",
      resave: true,
      saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
  //middleware
    app.use((req,res,next)=>{
      res.locals.success_msg = req.flash("success_msg")
      res.locals.error_msg = req.flash("error_msg")
      res.locals.error = req.flash("error")
      res.locals.user = req.user||null
      next()
    })
  //body parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
  //handlebars
    app.engine('handlebars', handlebars.engine({ defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
  //mongoose  
    mongoose.Promise = global.Promise;
    mongoose.connect(db.mongoURI).then(()=>{
      console.log("conectado ao mongo")
      useMongoClient: true
    }).catch((err)=>{
      console.log("Erro ao conectar ao banco"+err)
    })
  //public - arquivos estaticos
    app.use(express.static(path.join(__dirname,"public")))
 
  //rotas
    app.get('/',(req,res)=>{
      res.render("index")
    })
    app.use('/admin', admin)
    app.use('/usuarios',usuarios)
//outros
const PORT = process.env.PORT|| 8081
app.listen(PORT,()=>{
  console.log("Servdidor rodando na porta: "+PORT)
})