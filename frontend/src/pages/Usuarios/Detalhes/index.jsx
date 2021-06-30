import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
 
export default function DetalhesUsuario(props){
    const[state, setState] = useState({
        usuario: []
    });
 
    useEffect(
        ()=>{
            const {id} = props.match.params;
            axios.get(`http://localhost:3003/globalhitss/usuarios/${id}`)
           .then(
               res => {
                   const usuario = res.data;
                   setState({usuario})
               }
           )
        },[props.match.params]
    )
    
    const {usuario} = state;
    return(
        <>
            <h3>Detalhes Usuário</h3>
 
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Informações</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                       <td>
                           <p>Nome: {usuario.nome}</p>
                           <p>Login: {usuario.login}</p>
                           <p>Senha: {usuario.senha}</p>
                           <p>Gestor: {usuario.gestor ? 'Sim ':'Não'}</p>
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
                    
            
                    
                </tbody>
            </table>
            <p><Link to='/usuarios'>Voltar</Link></p>
            </>
    )
}
