import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
 
export default function DetalhesPergunta(props){
    const[state, setState] = useState({
        pergunta: []
    });
 
    useEffect(
        ()=>{
            const {id} = props.match.params;
            axios.get(`http://localhost:3003/globalhitss/perguntas/${id}`)
           .then(
               res => {
                   const pergunta = res.data;
                   setState({pergunta})
               }
           )
        },[props.match.params]
    )
    
    const {pergunta} = state;
    return(
        <>
            <h3>Detalhes do Formulário</h3>
 
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
                           <p>idTime: {pergunta.idTime}</p>
                           <p>tipo: {pergunta.tipo}</p>
                           
                           <p>Criado em: {moment(pergunta.createdAt).format('DD/MM/YYYY')}</p>
                           <p>Editado em: {moment(pergunta.updatedAt).format('DD/MM/YYYY')}</p>
                        </td>
                       <td>
                           <p> - </p>
                           <p> - </p>
                           <p><Link to={`/editarPergunta/${pergunta.id}`}>Editar</Link></p>
                           <p><Link to={`/excluirPergunta/${pergunta.id}`}>Excluir</Link></p>
                       </td>
                    </tr>
                    
            
                    
                </tbody>
            </table>
            <p><Link to='/perguntas'>Voltar</Link></p>
            </>
    )
}
