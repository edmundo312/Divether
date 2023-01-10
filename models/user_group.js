import Sequelize from "sequelize";
import db from "../config/db.js";

export const User_group = db.define("user_group",{
    user_group_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_group_name:{
        type: Sequelize.STRING
    },
    user_group_status:{
        type: Sequelize.CHAR
    }
},{
    freezeTableName: true,
});