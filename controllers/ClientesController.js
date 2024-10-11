import express from "express";
const router = express.Router();
import Cliente from "../models/Clientes.js"

router.get("/clientes", (req,res) => {
    Cliente.findAll().then((clientes) => {
        res.render("clientes", {
            clientes: clientes
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.post("/clientes/new", (req, res) => {
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const email = req.body.email;
    const senha = req.body.senha;
    Cliente.create({
        nome: nome,
        cpf: cpf,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        email: email,
        senha: senha
    }).then(() => {
        res.redirect("/clientes");
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/clientes/edit/:id", (req, res) => {
    const id = req.params.id;
    Cliente.findByPk(id).then((cliente) => {
        res.render("clientesEdit", {
            cliente: cliente
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.post("/clientes/update", (req, res) => {
    const id = req.body.id;
    const nome = req.body.nome;
    const cpf = req.body.cpf;
    const endereco = req.body.endereco;
    const bairro = req.body.bairro;
    const cidade = req.body.cidade;
    const estado = req.body.estado;
    const email = req.body.email;
    const senha = req.body.senha;
    Cliente.update({
        nome: nome,
        cpf: cpf,
        endereco: endereco,
        bairro: bairro,
        cidade: cidade,
        estado: estado,
        email: email,
        senha: senha
    }, { where: { id: id }}).then(() => {
        res.redirect("/clientes");
    }).catch((error) => {
        console.log(error);
    })
});

router.get("/clientes/delete/:id", (req, res) => {
    const id = req.params.id;
    Cliente.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("/clientes");
    }).catch((error) => {
        console.log(error);
    })
});

export default router;