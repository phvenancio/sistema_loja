import Sequelize from "sequelize";
import connection from "../config/sequelize-config.js";

const Pedido = connection.define("pedidos", {
    numeroPedido: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    horaPedido: {
        type: Sequelize.TIME,
        allowNull: false
    },
    horaEntrega: {
        type: Sequelize.TIME,
        allowNull: true
    }
});

Pedido.sync({force: false});
export default Pedido;