module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        classMethods: {
            associate: function(models) {
                Item.belongsTo(models.list, {
                    foreignKey: {
                        allowNull: false
                    }
                });
            }
        }
    });
    return Item;
};