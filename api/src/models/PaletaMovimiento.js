const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define(
        "PaletaMovimiento",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
                field: "id_cliente",
            },
            cantidad: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },

            tipo: {
                type: DataTypes.ENUM('ENTREGA', 'SALIDA POR PUBLICIDAD', 'DERRETIDAS', 'REGALADAS','DUEÑO', 'OTRO')
            },
          
        },
        {
            timestamps: true,
        }
    );
};
