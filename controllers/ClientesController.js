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

router.post("/clientes/new", async (req, res) => {
    const { nome, cpf, endereco, bairro, cidade, estado, email, senha } = req.body;
    Cliente.create({
        nome, cpf, endereco, bairro, cidade, estado, email, senha
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

router.post("/clientes/update", async (req, res) => {
    const { id, nome, cpf, endereco, bairro, cidade, estado, email, senha } = req.body;
    Cliente.update({
        nome, cpf, endereco, bairro, cidade, estado, email, senha
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