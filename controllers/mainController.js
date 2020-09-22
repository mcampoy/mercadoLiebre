let db = require('../database/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const controller = {
    index: async (req, res) => {
        try {
        const inSale = await db.Product.findAll({
            where: {
                category: 'in-sale'
            }
        })
        const visited = await db.Product.findAll({
            where: {
                category: 'visited'
            }
        })

        res.render("index", {
            inSale,
            visited,
        });
        }catch (err) {
            console.error(err)
        }
    },

    search: async(req, res) => {
        console.log(req.query.keywords)
        try {

            let products = await db.Product.findAll({
                where: {
                    name: {
                        [Op.like]: `%${req.query.keywords}%`
                    }
                }
            })

            return res.render('results', {
                products,
            })

        } catch (err) {
            console.error(err)
        }
    }
};

module.exports = controller;
