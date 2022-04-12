const { verify } = require("crypto");
const { query } = require("express");
const express = require("express");
const res = require("express/lib/response");
const { redirect, get } = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/Categoria");
const Categoria = mongoose.model("categorias");
const { eAdmin } = require("../helpers/eAdmin");
require("../models/Postagem");
const Postagem = mongoose.model("postagens");
require("../models/Obra");
const Obra = mongoose.model("obras");
require("../models/Semana");
const Semana = mongoose.model("semanas");
require("../models/Totalizador");
const Totalizador = mongoose.model("totalizadores");
require("../models/Escalacao");
const Escalacao = mongoose.model("escalacoes");

//rota para renderizar home page
router.get("/", eAdmin, (req, res) => {
  res.render("admin/index");
});

//cood para rodar mongo fb sem erros
mongoose.Promise = global.Promise;

//rota get para listar os funcionarios
router.get("/categorias", eAdmin, (req, res) => {
  Categoria.find()
    .sort({ date: "desc" })
    .then((categorias) => {
      res.render("./admin/categorias", {
        categorias: categorias.map((categorias) => categorias.toJSON()),
      });
    })
    .catch((err) => {
      console.log("Erro listar categorias! : " + err);
    });
});

//rota get para renderizar pagina de funcionarios
router.get("/categorias/add", eAdmin, (req, res) => {
  res.render("admin/addcategorias");
});

//rota post para add novo funcionario
router.post("/categorias/nova", eAdmin, (req, res) => {
  var erros = [];

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null ||
    req.body.nome.length < 10
  ) {
    erros.push({ texto: "Nome inválido!" });
  }
  if (req.body.cpf.length < 11 || req.body.cpf.length > 11) {
    erros.push({ texto: "CPF inválido!" });
  }
  if (req.body.telefone.length < 9 || req.body.cpf.length > 12) {
    erros.push({ texto: "Telefone inválido!" });
  }
  if (erros.length > 0) {
    res.render("admin/addcategorias", eAdmin, { erros: erros });
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      cpf: req.body.cpf,
      telefone: req.body.telefone,
      funcao: req.body.funcao,
      salario: req.body.salario,
    };
    new Categoria(novaCategoria)
      .save()
      .then(() => {
        req.flash("success_msg", "Funcionario cadastrado com sucesso!");
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        req.flash(
          "error_msg",
          "Erro ao cadastrar funcionário!! Tente novamente"
        );
        res.redirect("/");
      });
  }
});

router.get("/categorias/edit/:id", eAdmin, (req, res) => {
  //res.send("ROTA PARA EDIIÇÃO DE FUNCIONARIO")
  Categoria.findOne({ _id: req.params.id })
    .lean()
    .then((categorias) => {
      res.render("admin/editcategorias", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Este funcionario não existe");
      res.redirect("/admin/categorias");
    });
});

//rota post para editar funcionarios
router.post("/categorias/edit", eAdmin, (req, res) => {
  Categoria.findOne({ _id: req.body.id })
    .then((categorias) => {
      categorias.nome = req.body.nome;
      categorias.cpf = req.body.cpf;
      categorias.telefone = req.body.telefone;
      categorias.funcao = req.body.funcao;
      categorias.salario = req.body.salario;
      categorias
        .save()
        .then(() => {
          req.flash("success_msg", "Funcionario editado com sucesso");
          res.redirect("/admin/categorias");
        })
        .catch((err) => {
          req.flash("error_msg", "Erro ao salvar!");
          res.redirect("/admin/categorias");
        });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao salvar edição!");
      res.redirect("/admin/categorias");
    });
});

//rota get para listar obras
router.get("/postagens", eAdmin, (req, res) => {
  Obra.find()
    .sort({ data: "desc" })
    .then((obras) => {
      res.render("./admin/postagens", {
        obras: obras.map((obras) => obras.toJSON()),
      });
    })
    .catch((err) => {
      console.log("Erro listar categorias! : " + err);
    });
});

//rota get para passar todos funcionarios para view
router.get("/postagens/add", eAdmin, (req, res) => {
  Categoria.find()
    .lean()
    .then((categorias) => {
      res.render("admin/addpostagem", { categorias: categorias });
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao carregar o formulario!");
      res.redirect("/admin");
    });
});

//rota get para renderiza obras pagina diarias
router.get("/diaria", eAdmin, (req, res) => {
  Obra.find()
    .sort({ data: "desc" })
    .then((obras) => {
      res.render("admin/diarias", {
        obras: obras.map((obras) => obras.toJSON()),
      });
    })
    .catch((err) => {
      console.log("Erro listar categorias! : " + err);
    });
});

router.get("/diarias/add/:id", eAdmin, (req, res) => {
  Semana.findOne({ obra: req.params.id })
    .lean()
    .then((semanas) => {
      Escalacao.find({ obra: req.params.id })
        .lean()
        .populate("categoria")
        .then((escalacoes) => {
          Obra.findOne({ _id: req.params.id })
            .lean()
            .then((obras) => {
              Categoria.find({ obra: req.params.id })
                .lean()
                .then((categorias) => {
                  res.render("admin/adddiaria", {
                    categorias: categorias,
                    obras: obras,
                    escalacoes: escalacoes,
                    semanas: semanas,
                  });
                })
                .catch((err) => {
                  req.flash(
                    "error_msg",
                    "Houve um erro ao carregar o formulario!"
                  );
                  res.redirect("/admin");
                });
            });
        });
    });
});

//rota para reenderizar obras para relatorios da obra
router.get("/relatorios",eAdmin,(req, res) => {
    Obra.find()
    .sort({ data: "desc" })
    .then((obras) => {
      res.render("admin/relatorios", {
        obras: obras.map((obras) => obras.toJSON()),
      });
    })
    .catch((err) => {
      console.log("Erro listar categorias! : " + err);
    });
})
//rota para renderizar relatorios de obra em especifico
router.get("/relatorios/obra/:id",eAdmin,(req, res) => {
    Semana.find({obra: req.params.id}).lean().then((semanas) => {
      Obra.findOne({_id: req.params.id}).lean().then((obras) => {
        Semana.findOne({obra: req.params.id}).lean().then((totalgeral) => {
      res.render("admin/relatoriosobra", {
        semanas:semanas,obras:obras, totalgeral:totalgeral});
    }).catch((err) => {
      console.log("Erro, não existe nemhum relátorio!" + err);
    });
  }).catch((err) => {
    console.log("Erro, não existe nemhum relátorio!" + err);
  });
})
})
async function resetarDiarias(escalacaoId) {
  resp = await Escalacao.collection.updateOne(
    { _id: escalacaoId },
    {
      $unset: {
        checkSegundaM: "",
        checkSegundaT: "",
        checkTercaM: "",
        checkTercaT: "",
        checkQuartaM: "",
        checkQuartaT: "",
        checkQuintaM: "",
        checkQuintaT: "",
        checkSextaM: "",
        checkSextaT: "",
        checkSabadoM: "",
        checkSabadoT: "",
        checkDomingoM: "",
        checkDomingoT: "",
      },
    }
  );
  console.log(resp);
}

//rota para adicionar diarias para funcionario
router.post("/diarias/lancar", eAdmin, async (req, res) => {
    var totalSemana = 0; 
   
    semana = await Semana.findOne({ obra: req.body[0].idObra })
    
    for (const diaria of req.body) {
        escalacao = await Escalacao.findOne({ _id: diaria.idEscalacao })
        await Escalacao.updateOne({_id: escalacao._id}, {$set: diaria.diarias}, {new: true, upsert: true})
        
        escalacao.numeroDiarias = diaria.qtdDiarias;
        escalacao.total = (diaria.qtdDiarias * diaria.salario)
        await escalacao.save()
        
        totalSemana += escalacao.total
    }
   
    semana.total = totalSemana;
    await semana.save()

    return res.send({'redirect': '/admin/diaria'})
});

//rota get para listar escalações
router.get("/postagens/remover/:id", (req, res) => {
  Escalacao.find({ obra: req.params.id })
    .lean()
    .populate("categoria")
    .then((escalacoes) => {
      Obra.findOne({ _id: req.params.id })
        .lean()
        .then((obras) => {
          res.render("admin/deletarescalcao", {
            escalacoes: escalacoes,
            obras: obras,
          });
        })
        .catch((err) => {
          req.flash("error_msg", "Houve um erro ao listar funcionarios");
          res.redirect("/admin/postagens");
        });
    });
});
//rota para remover escalção de funcionario
router.post("/postagens/deletar/escalacao/", (req, res) => {
  Escalacao.remove({ _id: req.body.escalacao })
    .then(() => {
      req.flash("success_msg", "Escalacao deletada com sucesso!");
      res.redirect("/admin/postagens");
    })
    .catch((err) => {
      req.flash("error_msg", "Houve um erro ao deletar escalação");
      res.redirect("/admin/postagens");
    });
});

//rota get para escalar funcionarios para obra
router.get("/postagens/escalar/:id", eAdmin, (req, res) => {
  Escalacao.find({ obra: req.params.id })
    .lean()
    .populate("categoria")
    .then((escalacoes) => {
      Obra.findOne({ _id: req.params.id })
        .lean()
        .then((obras) => {
          Categoria.find()
            .lean()
            .then((categorias) => {
              res.render("admin/escalarfuncionario", {
                categorias: categorias,
                obras: obras,
                escalacoes: escalacoes,
              });
            })
            .catch((err) => {
              req.flash("error_msg", "erro ao listar funcionarios");
              res.redirect("/admin/postagens");
            });
        })
        .catch((err) => {
          req.flash("error_msg", "Houve um erro ao listar funcionario");
          res.redirect("/admin/postagens");
        });
    });
});

function novasemana(id){
  var data = new Date();
  var inicioSemana = data.getDay();
  var diaMes = data.getDate();
  console.log("S id obra:"+id)
  console.log("inicio segunda["+diaMes+"] final domingo["+(diaMes+5)+"]")

  Semana.findOne({obra:id}).lean().then((semanas)=>{  
    if(inicioSemana == 1){
      if(semanas.iniciada != 1){
          const novaSemana = {
          obra: id,
          iniciada: 1,
          }
        new Semana(novaSemana).save();
      }   
    }
  }) 
}


router.post("/postagens/escalar/funcionario", eAdmin, (req, res) => {
 // console.log("ID Obra:" + req.body.id);

  //funcao para criar novas semanas
   novasemana(req.body.id);

  const novaEscalacao = {
    categoria: req.body.categoria,
    obra: req.body.id,
    escalado: true,
  };
  new Escalacao(novaEscalacao)
    .save()
    .then(() => {
      req.flash("success_msg", "funcionario escalado com sucesso!");
      res.redirect("/admin/postagens");
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao escalar funcionario!! Tente novamente");
      res.redirect("/");
    });
});

//rota post pra add de obras
router.post("/postagens/nova", eAdmin, (req, res) => {
  var erros = [];

  if (
    !req.body.nomeObra ||
    typeof req.body.nomeObra == undefined ||
    req.body.nomeObra == null ||
    req.body.nomeObra.length < 5
  ) {
    erros.push({ texto: "Nome inválido!" });
  }
  if (
    !req.body.nomeProprietario ||
    typeof req.body.nomeProprietario == undefined ||
    req.body.nomeProprietario == null ||
    req.body.nomeProprietario.length < 5
  ) {
    erros.push({ texto: "Nome inválido!" });
  }
  if (erros.length > 0) {
    res.render("admin/addpostagem", { erros: erros });
  } else {
    const novaObra = {
      nomeObra: req.body.nomeObra,
      nomeProprietario: req.body.nomeProprietario,
      telefoneProprietario: req.body.telefoneProprietario,
    };
    new Obra(novaObra)
      .save()
      .then(() => {
        req.flash("success_msg", "Obra cadastrada com sucesso!");
        res.redirect("/admin/postagens");
      })
      .catch((err) => {
        req.flash("error_msg", "Erro ao cadastrar Obra!! Tente novamente");
        res.redirect("/");
      });
  }
});

//ROTA get PARA EDIIÇÃO DE Obras
router.get("/postagens/edit/:id", eAdmin, (req, res) => {
  Obra.findOne({ _id: req.params.id })
    .lean()
    .then((obra) => {
      res.render("admin/editpostagens", { obra: obra });
    })
    .catch((err) => {
      req.flash("error_msg", "Esta obra não existe");
      res.redirect("/admin/postagens");
    });
});

//ROTA post PARA EDIIÇÃO DE Obras
router.post("/postagens/edit", eAdmin, (req, res) => {
  Obra.findOne({ _id: req.body.id })
    .then((obra) => {
      obra.nomeObra = req.body.nomeObra;
      obra.nomeProprietario = req.body.nomeProprietario;
      obra.telefoneProprietario = req.body.telefoneProprietario;
      obra
        .save()
        .then(() => {
          req.flash("success_msg", "Obra editada com sucesso");
          res.redirect("/admin/postagens");
        })
        .catch((err) => {
          req.flash("error_msg", "Erro ao salvar edição!");
          res.redirect("/admin/postagens");
        });
    })
    .catch((err) => {
      req.flash("error_msg", "Erro ao salvar edição!");
      res.redirect("/admin/postagens");
    });
});

module.exports = router;
