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

router.post("/pedidos/new", (req, res) => {
    const numeroPedido = req.body.numeroPedido;
    const valor = req.body.valor;
    Pedido.create({
        numeroPedido: numeroPedido,
        valor: valor
    }).then(() => {
        res.redirect("/pedidos");
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/pedidos/edit/:id", (req, res) => {
    const id = req.params.id;
    Pedido.findByPk(id).then((pedido) => {
        res.render("pedidosEdit", {
            pedido: pedido
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.post("/pedidos/update", (req, res) => {
    const id = req.body.id;
    const numeroPedido = req.body.numeroPedido;
    const valor = req.body.valor;
    Pedido.update({
        numeroPedido: numeroPedido,
        valor: valor
    }, {where: { id: id }}).then(() => {
        res.redirect("/pedidos");
    }).catch((error) => {
        console.log(error);
    })
});

router.get("/pedidos/delete/:id", (req, res) => {
    const id = req.params.id;
    Pedido.destroy({
        where: { id: id }
    }).then(() => {
        res.redirect("/pedidos");
    }).catch((error) => {
        console.log(error);
    });
});

export default router;