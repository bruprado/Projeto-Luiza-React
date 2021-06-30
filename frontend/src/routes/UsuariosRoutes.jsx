import React from 'react'
import { Switch, Route } from "react-router-dom";
import MainUsuarios from "../pages/Usuarios/Main";
import UsuariosPorTime from "../pages/Usuarios/UsuarioPorTime";
import InserirUsuario from "../pages/Usuarios/Inserir";
import DetalhesUsuario from "../pages/Usuarios/Detalhes";
import ExcluirUsuario from "../pages/Usuarios/Excluir";
import EditarUsuario from "../pages/Usuarios/Editar";

export default function UsuariosRoute(){
    return(
        <>
            <Switch>
                <Route exact path = {'/usuarios'} component={MainUsuarios} />
                <Route exact path = {'/usuariosTime/:id'} component={UsuariosPorTime} />
                <Route exact path = {'/inserirUsuario/:id'} component={InserirUsuario} />
                <Route path={'/detalhesUsuario/:id'} component={DetalhesUsuario} />
                <Route path={'/excluirUsuario/:id'} component={ExcluirUsuario} />
                <Route path={'/editarUsuario/:id'} component={EditarUsuario} />
            </Switch>
        </>
    )
}