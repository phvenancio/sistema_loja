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

export default router;