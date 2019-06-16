'use strict'
var user = require('./user')
module.exports = (sequelize, DataTypes) => {
    var task = sequelize.define('tasks', {
                        id: {
                          type: DataTypes.INTEGER,
                          primaryKey: true
                        }, 
                        title: {
                            type: DataTypes.STRING
                          },
                        description: {
                            type: DataTypes.STRING
                        },
                        status: {
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
    //Preferences has one User
    
    return task;
                }