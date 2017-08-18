module.exports = function(sequelize, DataTypes) {
    var List = sequelize.define("list", {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: { min: 1 }
        }
    }, {
        classMethods: {
            associate: function(models) {
                List.belongsTo(models.user, {
                    foreignKey: {
                        allowNull: false
                    }
                }),
                List.hasMany(models.item, {
                    onDelete: "cascade"
                });
            }
        }
    });
    return List;
};