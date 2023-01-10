import Sequelize from "sequelize";
import db from "../config/db.js";

export const Promociones = db.define("promociones",{
    promocion_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    promocion_nombre:{
        type: Sequelize.STRING
    },
    promocion_imagen:{
        type: Sequelize.STRING
    },
    promocion_pdf:{
        type: Sequelize.STRING
    },
    promocion_laboratorio_id:{
        type: Sequelize.INTEGER,
        references: {
            model: "laboratorios",
            key: "laboratorio_id"
        }
    },
    promocion_status:{
        type: Sequelize.CHAR
    },
},{
    freezeTableName: true,
});

export const all_promociones = async () => {
    const [laboratorios, metadata] = await db.query(`
    SELECT * FROM promociones
    INNER JOIN laboratorios on promociones.promocion_laboratorio_id = laboratorios.laboratorio_id
    WHERE promocion_status LIKE 'A';
    `);
    return laboratorios;
}