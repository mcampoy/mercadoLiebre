let db = require('../database/models')

const controller = {
    // MUESTRA TODOS LOS PRODUCTOS
    index: async (req, res) => {
        try {
            let products = await db.Product.findAll()

            res.render('products', {
                products
            });

        } catch (error) {
            console.error(error)
        }

    },

    // DETALLE DE PRODUCTO
    detail: async (req, res) => {
        console.log(req.params.id)

        try {
            let product = await db.Product.findByPk(req.params.id);

            if (!product) {
                return res.redirect("/")
            } else {
                return res.render("detail", {
                    product
                });
            }
        } catch (error) {
            console.error(error)
        }
    },

    sales: async (req, res) => {
        try {
            const products = await db.Product.findAll({
                where: {
                    category: 'in-sale'
                }
            })
            res.render("sales", {
                products
            });
            }catch (err) {
                console.error(err)
            }
    },

    // MUESTRA EL FORMULARIO DE CREACIÓN DE PRODUCTO
    create: (req, res) => {

        res.render('product-create-form')

    },

    // CREA EL PRODUCTO
    store: (req, res) => {
        console.log(req.body)

        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description
        });


        res.redirect("/");
    },

    // MUESTRA LA VISTA PARA ACTUALIZAR UN PRODUCTO
    edit: async (req, res) => {

        let productToEdit = await db.Product.findByPk(req.params.id);

        // Si no encuentra el producto a editar redirecciona a la Home

        if (productToEdit == null) return res.redirect("/");

        //    Envío a la vista el formulario para editar el producto y los datos del producto que voy a editar

        res.render('product-edit-form', {
            productToEdit: productToEdit
        })
    },
    // ACTUALIZA UN PRODUCTO
    update: (req, res) => {

        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description

        }, {
            where: {
                id: req.params.id
            }
        });
        res.redirect("/products/detail/" + req.params.id);
    },

    // ELIMINA UN PRODUCTO DE LA BASE DE DATOS
    destroy: (req, res) => {
        db.Product.destroy({
            where: {
                id: req.params.id
            }
        })

        res.redirect("/products");
    },
};

module.exports = controller;