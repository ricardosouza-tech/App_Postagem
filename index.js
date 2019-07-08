const express = require("express"); // chamado a funcao express que es dentro de node_mudules
const app = express(); // transformando toda função express para dentro de app
const handlebars = require('express-handlebars'); // engine 
const bodyParser = require('body-parser');  //Middleware de análise de corpo do Node.js
const Post = require('./models/Post');



// Body-Parser \\\\\\\\\\\\\\\\\\\
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Configue 
// template Engine
app.engine('handlebars', handlebars({defaultLayout: 'main',}))
app.set('view engine', 'handlebars')

// Rotas
app.get('/card', function(req, res){
    res.render('formulario')
});

// Rotas para renderisar após enviar os dados do Post
app.get('/', function(req, res){
  Post.findAll({order:[['id','DESC']]}).then(function(post){
    res.render('home', {post: post})
  })
})


// Rota para receber o metodo POST
app.post('/add', function(req, res){
    Post.create({
      titulo: req.body.titulo,
      conteudo: req.body.conteudo

    }).then(function() {
      res.redirect('/') // redenrisando apos enviar o post ira para pagina home (lista de post)
    }).catch(function(err) {
      res.send("Falha na Postagem! "+ err)
    })
})



// rota para deletar uma postagem 
app.get('/deletar/:id', function(req, res){
  Post.destroy({where:{'id': req.params.id}}).then(function(){
  res.send("Postagem deletada com sucesso")
  
}).catch(function(err){
  res.send("Esta postagem não existe!")
  })
})


app.listen(8081, function(){        //Funcao de callback e executada sempre que uma função acontece
    console.log("Servidor rodando na porta 8081");

});// tem que ser a ultima linha do seu codigo 