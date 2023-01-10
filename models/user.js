import Sequelize from "sequelize";
import db from "../config/db.js";

export const User = db.define("user",{
    user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_nombre:{
        type: Sequelize.STRING
    },
    user_group_id:{
        type: Sequelize.INTEGER
    },
    user_password:{
        type: Sequelize.STRING
    },
    user_correo:{
        type: Sequelize.STRING
    },
    user_telefono:{
        type: Sequelize.STRING
    },
    user_ubicacion:{
        type: Sequelize.STRING
    },
    user_status:{
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true,
});

export const all_users = async () => {
    const [laboratorios, metadata] = await db.query(`
    SELECT * FROM user
    INNER JOIN user_group ON user.user_group_id = user_group.user_group_id
    WHERE user_status LIKE 'A';
    `);
    return laboratorios;
}