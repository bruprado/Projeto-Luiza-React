import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function UsuariosPorTime(props) {
    const [usuarios, setUsuarios] = useState([]);
    const [time, setTime] = useState([]);

    
    useEffect(
        () => {
            
            const {id} = props.match.params;
            console.log(id)
            axios.get(`http://localhost:3003/globalhitss/usersTime/${id}`)
                .then(
                    (res) => {
                        const get = res.data;
                        const usuarios = Object.assign(get);
                        setTime(usuarios)
                        setUsuarios(usuarios.users)
                    }
                )
        }, [props.match.params]
    );
    
    
    return (
        <>
            <h3>Usuarios de {time.nome}</h3>
            <Link to={`/inserirUsuario/${time.id}`}>Adicionar</Link>
            <Link to="/times" className="btn btn-success mt-3">Voltar</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Senha</th>
                        <th>Tipo</th>
                        <th>Mais Informações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.length > 0 ? (
                            usuarios.map(
                                (usuario, index) =>(
                                    <tr key={index}>
                                        <td>{usuario.nome}</td>
                                        <td>{usuario.login}</td>
                                        <td>{usuario.senha}</td>
                                        <td>{usuario.tipo}</td>
                                        <td><Link to={`/detalhesUsuario/${usuario.id}`}>Detalhes</Link></td>
                                    </tr>
                                )
                            )
                        ):(
                            <tr>
                                <td colSpan='3'>Nenhum usuário registrado</td>
                            </tr>
                        )
                    }
                </tbody>
            </table>

            <p><Link to={`/detalhesTime/${usuarios.id}`}>Voltar</Link></p>
          
        </>
    )
};