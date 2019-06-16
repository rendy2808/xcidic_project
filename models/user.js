'use strict'
var task = require('./task')
module.exports = (sequelize, DataTypes) => {
    var user = sequelize.define('users', {
                        id: {
                          type: DataTypes.INTEGER,
                          primaryKey: true
                        },
                        name: {
                          type: DataTypes.STRING
                        },
                        username: {
                            type: DataTypes.STRING
                          },
                        password: {
                        type: DataTypes.STRING
                        },
                        type: {
                          type: DataTypes.STRING
                        },
                        created: { 
                            type: DataTypes.DATE, 
                            defaultValue: DataTypes.NOW 
                        },
                        updated: { 
                            type: DataTypes.DATE, 
                            defaultValue: DataTypes.NOW 
                        }
                        
                      },
                      { underscored: true,
                        freezeTableName: true,
                        timestamps: false
                      }
                    )


    return user;
                }