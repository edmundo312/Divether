import Sequelize from "sequelize";
import db from "../config/db.js";

export const Productos = db.define("productos",{
    producto_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    producto_nombre:{
        type: Sequelize.STRING
    },
    producto_imagen:{
        type: Sequelize.STRING
    },
    producto_uso:{
        type: Sequelize.STRING
    },
    producto_descripcion:{
        type: Sequelize.STRING
    },
    producto_precio:{
        type: Sequelize.INTEGER
    },
    producto_laboratorio_id:{
        type: Sequelize.INTEGER,
        references: {
            model: "laboratorios",
            key: "laboratorio_id"
        }
    },
    producto_status:{
        type: Sequelize.CHAR
    },
},{
    freezeTableName: true,
});

export const all_productos = async () => {
    const [productos, metadata] = await db.query(`
    SELECT * FROM productos
    INNER JOIN laboratorios ON productos.producto_laboratorio_id = laboratorios.laboratorio_id
    WHERE producto_status LIKE 'A'
    
    `);
    return productos;
}

export const obtener_productos_by_laboratorio = async (data) => {
    const [productos, metadata] = await db.query(`
    SELECT * FROM productos
    INNER JOIN laboratorios ON laboratorios.laboratorio_id = productos.producto_laboratorio_id
    WHERE productos.producto_laboratorio_id = ${data};
    `);
    return productos;
}