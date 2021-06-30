import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function MainUsuarios(props) {
    const [state, setState] = useState({
        usuarios: []
    });

    useEffect(
        () => {
            axios.get(`http://localhost:3003/globalhitss/usuarios`)
                .then(
                    res => {
                        const usuarios = res.data;
                        setState({ usuarios })
                    }
                )
        }, []
    )

    const { usuarios } = state;
    return (
        <>
            <h3>Usuários</h3>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Senha</th>
                        <th>Gestor</th>
                        <th>Time</th>
                        <th>Criado</th>
                        <th>Editado</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(

                            (usuario, key) =>
                            (
                                <tr key={key}>
                                    <td>{usuario.nome}</td>
                                    <td>{usuario.login}</td>
                                    <td>{usuario.senha}</td>
                                    <td>{usuario.gestor ? 'Sim ' : 'Não'}</td>
                                    <td>{usuario.idTime}</td>
                                    <td>{moment(usuario.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(usuario.updatedAt).format('DD/MM/YYYY')}</td>
                                    
                                </tr>
                            )
                        )
                    }





                    {/* <tr>
                        <td>
                            <p>Nome: {usuario.nome}</p>
                            <p>Login: {usuario.login}</p>
                            <p>Senha: {usuario.senha}</p>
                            <p>Gestor: {usuario.gestor ? 'Sim ' : 'Não'}</p>
                            <p>idTime: {usuario.idTime}</p>

                            <p>Criado em: {moment(usuario.createdAt).format('DD/MM/YYYY')}</p>
                            <p>Editado em: {moment(usuario.updatedAt).format('DD/MM/YYYY')}</p>
                        </td>
                        <td>
                            <p> - </p>
                            <p> - </p>
                            <p><Link to={`/editarUsuario/${usuario.id}`}>Editar</Link></p>
                            <p><Link to={`/excluirUsuario/${usuario.id}`}>Excluir</Link></p>
                        </td>
                    </tr>
 */}


                </tbody>
            </table>
            <p><Link to='/usuarios'>Voltar</Link></p>
        </>
    )
};