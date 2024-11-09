import express from "express";
const router = express.Router();
import Pedido from "../models/Pedidos.js"
import Auth from "../middleware/Auth.js";

router.get("/pedidos", Auth, (req,res) => {
    Pedido.findAll().then((pedidos) => {
        res.render("pedidos", {
            pedidos: pedidos
        });
    }).catch(error => {
        console.log(error);
    });
});

router.post("/pedidos/new", Auth, async (req, res) => {
    const {numeroPedido, valor} = req.body;
    const horaPedido = new Date();
    Pedido.create({
        numeroPedido,
        valor,
        horaPedido
    }).then(() => {
        res.redirect("/pedidos");
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/pedidos/entregar/:id", Auth, (req, res) => {
    const id = req.params.id;
    const horaEntrega = new Date();
    Pedido.update({
        horaEntrega: horaEntrega
    }, {where: { id: id }}).then(() => {
        res.redirect("/pedidos");
    }).catch((error) => {
        console.log(error);
    });
});

router.get("/pedidos/edit/:id", Auth, (req, res) => {
    const id = req.params.id;
    Pedido.findByPk(id).then((pedido) => {
        res.render("pedidosEdit", {
            pedido: pedido
        });
    }).catch((error) => {
        console.log(error);
    });
});

router.post("/pedidos/update", Auth, async (req, res) => {
    const {id, numeroPedido, valor} = req.body;
    Pedido.update({
        numeroPedido,
        valor,
    }, {where: { id: id }}).then(() => {
        res.redirect("/pedidos");
    }).catch((error) => {
        console.log(error);
    })
});

router.get("/pedidos/delete/:id", Auth, (req, res) => {
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