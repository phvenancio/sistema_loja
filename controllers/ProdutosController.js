import express from "express";
const router = express.Router();
import Produto from "../models/Produtos.js"

router.get("/produtos", (req,res) => {
    Produto.findAll().then((produtos) => {
        res.render("produtos", {
            produtos: produtos
        });
    }).catch(error => {
        console.log(error);
    });
});

router.post("/produtos/new", (req, res) => {
    const nomeProduto = req.body.nomeProduto;
    const preco = req.body.preco;
    const categoria = req.body.categoria;
    const estoque = req.body.estoque;
    Produto.create({
        nomeProduto: nomeProduto,
        preco: preco,
        categoria: categoria,
        estoque: estoque
    }).then(() => {
        res.redirect("/produtos");
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/produtos/edit/:id", (req, res) => {
    const id = req.params.id;
    Produto.findByPk(id).then((produto) => {
        res.render("produtosEdit", {
            produto: produto
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.post("/produtos/update", (req, res) => {
    const id = req.body.id;
    const nomeProduto = req.body.nomeProduto;
    const preco = req.body.preco;
    const categoria = req.body.categoria;
    const estoque = req.body.estoque;
    Produto.update({
        nomeProduto: nomeProduto,
        preco: preco,
        categoria: categoria,
        estoque: estoque
    }, {where: { id: id }}).then(() => {
        res.redirect("/produtos");
    }).catch((error) => {
        console.log(error);
    })
});

router.get("/produtos/delete/:id", (req, res) => {
    const id = req.params.id;
    Produto.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("/produtos");
    }).catch((error) => {
        console.log(error);
    });
});

export default router;