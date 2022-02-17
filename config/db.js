if(process.env.NODE_ENV == "production"){
  module.exports = {mongoURI:"mongodb+srv://ronaldoleles:ronaldo007@deploy-app-web.gyebk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"}
}else{
  module.exports={mongoURI:"mongodb://localhost/construtora"}
}