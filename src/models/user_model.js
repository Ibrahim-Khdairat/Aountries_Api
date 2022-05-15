'use strict';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const replyBody = require("../routes/common/replyBody");
require('dotenv').config();

const UsersModel = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
   
        roleId: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
        },

        capabilities: {
            type: DataTypes.VIRTUAL,
            get() {
                const acl = {
                    admin: ['read', 'create'],
                    user: ['read']
                };
                return acl[this.role]
            }
        },

        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ id: this.id, roleId: this.roleId}, process.env.JWT_SECRET || 'MYSUPERSECRET');
            },

            set(tokenObject){
                let token = jwt.sign(tokenObject, process.env.JWT_SECRET || 'MYSUPERSECRET');
                return token;
            }
        }

    });

    Users.beforeCreate(Users => {
        Users.password = bcrypt.hashSync(Users.password, 10);
        Users.roleId = Users.roleId.toString();
    });
    

    Users.authenticateBasic = (userName, password) => {
     
        return Users.findOne({  where: { userName } }) 
        .then( async (User) => {
          
            if (User && await bcrypt.compare(password, Users.password)) {
                return Users;
            }
            else {
                return("Invalid User");
                // throw new Error("Invalid User");
            }
        });
    };

    Users.authenticateToken = (token) => {
        return jwt.verify(token, process.env.JWT_SECRET || "MYSUPERSECRET", (err, decoded) => {
            if (err) {
                throw (replyBody("USER_AUTHENTICATION_ERROR", "Un_Authorized_User"));
            } else {
                return decoded;
            }
        });
    };
    return Users;
}

module.exports = UsersModel;