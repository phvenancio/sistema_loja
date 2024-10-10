import express from "express";
const router = express.Router();
import Pedido from "../models/Pedidos.js"

router.get("/pedidos", (req,res) => {
    Pedido.findAll().then((pedidos) => {
        res.render("pedidos", {
            pedidos: pedidos
        });
    }).catch(error => {
        console.log(error);
    });
});

export default router;