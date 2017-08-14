module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("user", {
        facebook_id: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        }
    }, {
        classMethods: {
            associate: function(models) {
                User.hasMany(models.list, {
                    onDelete: "cascade"
                });
            }
        }
    });

    return User;
};