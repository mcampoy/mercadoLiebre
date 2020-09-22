const fs = require("fs");
const path = require("path");
let bcrypt = require('bcrypt');

let userpath = path.resolve(__dirname, '../data/users-db.json');

function getUsers() {
  let usersJson = fs.readFileSync(userpath, 'utf-8');
  if (usersJson != '') {
    return JSON.parse(usersJson)
  } else {
    return []
  }
};

function userIdGenerator() {
  let users = getUsers();
  if (users.length) {
    return users.length + 1;
  } else {
    return 1;
  }
};

function saveUser(user) {
  let users = getUsers();
  users.push(user);
  fs.writeFileSync(userpath, JSON.stringify(users, null, ' '))
};

function getUserByEmail(email) {
  let users = getUsers()
  return users.find(user => user.email == email)
}

function getUserById(id) {
  let users = getUsers()
  return users.find(user => user.id == id)
}


const controller = {
    // Mostrar un formulario de registro (GET)
    register: (req, res) => {
        res.render('register');
    },


    // Crear un nuevo usuario a partir del registro (POST)
    createUser: (req, res, next) => {
        
        if(req.body.password != req.body.password2){
            return res.send('Las contraseñas no coinciden')
        }

        delete req.body.password2;

        const user = {
            id: userIdGenerator(),
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.files[0].filename,
        };
        // res.send(user); Testeo para ver qué me está llegando por body

        saveUser(user);

        // res.render('profile', {user})
        res.redirect(`profile/${user.id}`);

    },

    login: function (req, res, next) {

        res.render('login');
     },

     access: (req, res) => {
         let user = getUserByEmail(req.body.email)

        if (user != undefined) {
         // Si existe, comprobar que la contraseña sea la correcta

             if (bcrypt.compareSync(req.body.password, user.password)) {

              // res.render('profile', {user})
                     res.redirect(`profile/${user.id}`);

             } else {
                      res.send('Contraseña incorrecta');
             }
     
        } else {

             res.send('No hemos encontrado ningún usuario registrado con ese email')
        }

  },

    profile: function (req, res, next) {

        let user = getUserById(req.params.id)

        res.render('profile', {user});

    },

};

module.exports = controller;