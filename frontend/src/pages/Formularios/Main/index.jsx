import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function MainFormularios (props) {
    const [state, setState] = useState({
        formularios: []
    });

    useEffect(
        () => {
            axios.get(`http://localhost:3003/globalhitss/formularios`)
                .then(
                    res => {
                        const formularios = res.data;
                        setState({ formularios })
                    }
                )
        }, []
    )

    const { formularios } = state;
    return (
        <>
            <h3>Formulários</h3>
            <Link to={'/inserirFormulario'}>Adicionar</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Tipo</th>
                        <th>Criado</th>
                        <th>Editado</th>
                        <th>Ações</th>
                        <th>Mais Informações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formularios.map(

                            (formulario, key) =>
                            (
                                <tr key={key}>
                                    <td>{formulario.idTime}</td>
                                    <td>{formulario.tipo}</td>
                                    <td>{moment(formulario.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(formulario.updatedAt).format('DD/MM/YYYY')}</td>
                                    <td><Link to={`/editarformulario/${formulario.id}`}>Editar</Link> <Link to={`/excluirformulario/${formulario.id}`}>Excluir</Link></td>
                                    <td><Link to={`/detalhesFormulario/${formulario.id}`}>Detalhes</Link></td> 
                                </tr>
                            )
                        )
                    }

                </tbody>
            </table>
            <p><Link to='/'>Voltar</Link></p>
        </>
    )
};