import express from "express";
const router = express.Router();
import Produto from "../models/Produtos.js"
import Auth from "../middleware/Auth.js";

router.get("/produtos", Auth, (req,res) => {
    Produto.findAll().then((produtos) => {
        res.render("produtos", {
            produtos: produtos
        });
    }).catch(error => {
        console.log(error);
    });
});

router.post("/produtos/new", Auth, async (req, res) => {
    const {nomeProduto, preco, categoria, estoque} = req.body;
    Produto.create({
        nomeProduto, 
        preco, 
        categoria, 
        estoque
    }).then(() => {
        res.redirect("/produtos");
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/produtos/edit/:id", Auth, (req, res) => {
    const id = req.params.id;
    Produto.findByPk(id).then((produto) => {
        res.render("produtosEdit", {
            produto: produto
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.post("/produtos/update", Auth, async (req, res) => {
    const {id, nomeProduto, preco, categoria, estoque} = req.body;
    Produto.update({
        nomeProduto,
        preco,
        categoria,
        estoque
    }, {where: { id: id }}).then(() => {
        res.redirect("/produtos");
    }).catch((error) => {
        console.log(error);
    })
});

router.get("/produtos/delete/:id", Auth, (req, res) => {
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