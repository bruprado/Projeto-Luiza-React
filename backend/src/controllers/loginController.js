const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Usuarios = require('../models/usuarios');
const status = require('http-status');


// fazendo logout
// exports.logout = async (req, res) => {
//     try {
//         res.clearCookie("jwt");
//         console.log("logout sucess")
//         res.status(200).redirect("/login");
//     } catch (error) {
//         res.status(500).send(error)
//         console.log("logout error")
//     }
// }

exports.SearchAll = (req, res, next) => {
    const { login, senha } = req.body;
        
        if (!login || !senha) {
            return res.status(400).render("/", {
                message: "Por favor insira um usuário e uma senha"
            });
        }



    Usuarios.findAll()
        .then(
            (usuario) => {
                if (usuario) {
                    res.status(status.OK).send(usuario).render("/usuarios");
                }
            }
        ).catch(
            () => {
                error = next(error)
            }
        )
}


// realizando login
// exports.login = async (req, res) => {    
//     try {
//         const { name, password } = req.body;
        
//         if (!name || !password) {
//             return res.status(400).render("login", {
//                 message: "Por favor insira um usuário e uma senha"
//             });
//         }

//         db.query("SELECT * FROM login WHERE usuario = ?", [name], async (error, results) => {
            
//             //se não tiver resultados ou se a senha estiver incorreta
//             const equalPass = await bcrypt.compare(password, results[0]["senha"])         
//             if ((results.length < 1) || !equalPass) {                
//                 res.status(401).render("login", {
//                     message: "Usuário ou senha incorreto"
//                 });
//             } else {
//                 const id = results[0].id;

//                 const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
//                     expiresIn: process.env.JWT_EXPIRES_IN
//                 });

//                 console.log("O token é: " + token);

//                 const cookieOptions = {
//                     expires: new Date(
//                         Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
//                     ),
//                     httpOnly: true
//                 }
//                 res.cookie("jwt", token, cookieOptions);
                
//                 if (results[0]["tipo"] == 0) {
//                     //Redireciona para 
//                     res.render("admin");
//                     console.log("admin loggin success")    
//                 }

//                 if (results[0]["tipo"] == 1) {
//                     res.render("notadmin");
//                     console.log("gestor loggin success")
//                 }

//                 if (results[0]["tipo"] == 2) {
//                     res.render("colaborador");
//                     console.log("colaborador loggin success")
//                 }

//                 //res.status(200).redirect("/");
//             }
//         });

//     } catch (error) {
//         console.log("Error ao logar:" + error);
//     }
// }