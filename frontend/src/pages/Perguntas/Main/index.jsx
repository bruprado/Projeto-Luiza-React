import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

export default function MainPerguntas (props) {
    const [state, setState] = useState({
        perguntas: []
    });

    useEffect(
        () => {
            axios.get(`http://localhost:3003/globalhitss/perguntas`)
                .then(
                    res => {
                        const perguntas = res.data;
                        setState({ perguntas })
                    }
                )
        }, []
    )

    const { perguntas } = state;
    return (
        <>
            <h3>Perguntas</h3>
            <Link to={'/inserirPergunta'}>Adicionar</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Formulario</th>
                        <th>Pergunta</th>
                        <th>Tipo Texto</th>
                        <th>Tipo Selecionar</th>
                        <th>Tipo Sim/nao</th>
                        <th>Criado em:</th>
                        <th>Editado em:</th>
                        <th>Acoes:</th>
                        <th>Mais Informações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        perguntas.map(

                            (pergunta, key) =>
                            (
                                <tr key={key}>
                                    <td>{pergunta.idFormulario}</td>
                                    <td>{pergunta.textoPergunta}</td>
                                    <td>{pergunta.tipoText ? 'sim' : 'nao'}</td>
                                    <td>{pergunta.tipoRadio ? 'sim' : 'nao'}</td>
                                    <td>{pergunta.tipoBoolean ? 'sim' : 'nao'}</td>
                                    <td>{moment(pergunta.createdAt).format('DD/MM/YYYY')}</td>
                                    <td>{moment(pergunta.updatedAt).format('DD/MM/YYYY')}</td>
                                    <td><Link to={`/editarPergunta/${pergunta.id}`}>Editar</Link> <Link to={`/excluirPergunta/${pergunta.id}`}>Excluir</Link></td>
                                    <td><Link to={`/detalhesPergunta/${pergunta.id}`}>Detalhes</Link></td> 
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