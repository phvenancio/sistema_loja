// IMPORTAÇÕES:
// MODULOS
import express from "express";
const app = express();
import session from "express-session";
import flash from "express-flash";
// SEQUELIZE(CONFIG)
import connection from "./config/sequelize-config.js";
// CONTROLLERS
import UsersController from "./controllers/UsersController.js";
import ClientesController from "./controllers/ClientesController.js";
import ProdutosController from "./controllers/ProdutosController.js";
import PedidosController from "./controllers/PedidosController.js";
// MIDDLEWARE
import Auth from "./middleware/Auth.js";

// DEFININDO USO DE FERRAMENTAS
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(flash());

// CONFIGURANDO EXPRESS-SESSION
app.use(session({
    secret: "lojasecret",
    cookie: { maxAge: 3600000 },
    saveUninitialized: false,
    resave: false
}));

// CRIAÇÃO E AUTENTICAÇÃO DO BANCO DE DADOS
connection.query("CREATE DATABASE IF NOT EXISTS lojaDw").then(() => {
    console.log("Banco de Dados Criado com Sucesso!");
}).catch((error) => {
    console.log(error);
});

connection.authenticate().then(() => {
    console.log("Conexão com o banco Feita com Sucesso!");
}).catch((error) => {
    console.log(error);
});

// ROTA PRINCIPAL
app.get("/", Auth, (req, res) => {
    res.render("index", {
        messages: req.flash()
    });
});

// DEFININDO USO DAS ROTAS DOS CONTROLLERS
app.use("/", UsersController);
app.use("/", ClientesController);
app.use("/", ProdutosController);
app.use("/", PedidosController);

// INICIANDO SERVIDOR
const port = 8080;
app.listen(port, (error) => {
    if(error){
        console.log(`Ocorreu um erro: ${error}`);
    } else {
        console.log(`Servidor Iniciado com Sucesso em: http://localhost:${port}`);
    }
});