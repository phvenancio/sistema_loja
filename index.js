import express from "express";
const app = express();

import connection from "./config/sequelize-config.js";
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import PedidosController from "./controllers/PedidosController.js";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

connection.authenticate().then(() => {
    console.log("Conexão com o banco Feita com Sucesso!");
}).catch((error) => {
    console.log(error);
});

connection.query("CREATE DATABASE IF NOT EXISTS lojaDw").then(() => {
    console.log("Banco de Dados Criado com Sucesso!");
}).catch((error) => {
    console.log(error);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.use("/", ClientesController);
app.use("/", ProdutosController);
app.use("/", PedidosController);

const port = 8080;
app.listen(port, (error) => {
    if(error){
        console.log(`Ocorreu um erro: ${error}`);
    } else {
        console.log(`Servidor Iniciado com Sucesso em: http://localhost:${port}`);
    }
});