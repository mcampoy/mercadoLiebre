module.exports = (sequelize, dataTypes) => {
    const Product = sequelize.define("Product",
       // Configuraciones de las columnas.
  {
   id: {
    type: dataTypes.INTEGER,
    allowNull: false,
    primaryKey:true,
    autoIncrement: true
   },

   name: {
    type: dataTypes.STRING,
    allowNull: false,
   },

   description: {
    type: dataTypes.STRING,
    allowNull: false,
   },

   price: {
    type: dataTypes.DOUBLE,
    allowNull: true,
   },

   category: {
    type: dataTypes.STRING,
    allowNull: false,
   },

   discount: {
    type: dataTypes.INTEGER,
    allowNull: true,
   },

   image: {
    type: dataTypes.STRING,
    allowNull: true,
   }

  },
//    configuración de la table
  {
  tableName: 'productos', //Si el nombre de la tabla no coincide con el del modelo
  timestamps: false,  //Si no tengo timestamps

  });
    return Product;   // Este retorno es lo que exporto
  }
