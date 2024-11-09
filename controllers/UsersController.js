import express from "express";
const router = express.Router();
import User from "../models/User.js"
import bcrypt from "bcrypt";

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROTA DE LOGIN
router.get("/login", (req, res) => {
    res.render("login", {
        loggedOut: true,
        messages: req.flash()
    });
});

router.post("/authenticate", (req, res) => {
    const email = req.body.email;
    const senha = req.body.senha;
    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if(user != undefined){
            const correct = bcrypt.compareSync(senha, user.senha);

            if(correct){
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                req.flash("success", "Login Efetuado com Sucesso!");
                res.redirect("/");
            } else{
                req.flash("danger", "A Senha Informada está Incorreta! Tente Novamente.");
                res.redirect("/login");
            }
        } else{
            req.flash("danger", "O Usuário Informado Não Existe! Verifique os Dados Digitados.");
            res.redirect("/login");
        }
    });
});

// LOGOUT
router.get("/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/login");
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROTA DE CADASTRO
router.get("/cadastro", (req, res) => {
    res.render("cadastro", {
        loggedOut: true,
        messages: req.flash()
    });
});

router.post("/createUser", (req,res) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;
    User.findOne({
        where: { 
            email: email 
        }
    }).then((user) => {
        if(user == undefined){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(senha, salt);
            User.create({
                nome: nome,
                email: email,
                senha: hash
            }).then((user) => {
                req.session.user = {
                    id: user.id,
                    email: user.email
                }
                req.flash("success", "Cadastro Efetuado com Sucesso!");
                res.redirect("/");
            });
        } else{
            req.flash("danger", "O Usuário já está Cadastrado. Faça o Login.");
            res.redirect("/cadastro");
        }
    });
});

export default router;