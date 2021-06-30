import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function DetalhesTime(props) {
    const [state, setState] = useState({
        time: []
    });

    useEffect(
        () => {
            const { id } = props.match.params;
            axios.get(`http://localhost:3003/globalhitss/times/${id}`)
                .then(
                    res => {
                        const time = res.data;
                        setState({ time })
                    }
                )
        }, [props.match.params]
    )

    const { time } = state;
    return (
        <>
            <h3>Detalhes do Time</h3>

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
                            <p>Nome: {time.nome}</p>
                            <p>Criado em: {moment(time.createdAt).format('DD/MM/YYYY')}</p>
                            <p>Editado em: {moment(time.updatedAt).format('DD/MM/YYYY')}</p>
                        </td>
                        <td>
                            {/* --- AQUI --- */}
                            <p><Link to={`/usuariosTime/${time.id}`}>Ver Usuários</Link></p>
                            <p> - </p>
                            <p><Link to={`/editarTime/${time.id}`}>Editar</Link></p>
                            <p><Link to={`/excluirTime/${time.id}`}>Excluir</Link></p>
                        </td>
                    </tr>



                </tbody>
            </table>
            <p><Link to='/times'>Voltar</Link></p>
        </>
    )
}
