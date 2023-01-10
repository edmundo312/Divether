import Sequelize from "sequelize";
import db from "../config/db.js";

export const Laboratorios = db.define("laboratorios",{
    laboratorio_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    laboratorio_nombre:{
        type: Sequelize.STRING
    },
    laboratorio_imagen:{
        type: Sequelize.STRING
    },
    laboratorio_status:{
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true,
});

export const all_laboratorios = async () => {
    const [laboratorios, metadata] = await db.query(`
    SELECT * FROM laboratorios
    WHERE laboratorios.laboratorio_status ="A"
    ORDER BY laboratorios.laboratorio_nombre ASC
    `);
    return laboratorios;
}