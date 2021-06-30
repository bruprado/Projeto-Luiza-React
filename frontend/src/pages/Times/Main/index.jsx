import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MainTimes() {
    const [state, setState] = useState({
        times: []
    })


    //useeffec chama atravez do axis o node no backend (pelo cors) e tras os dados
    //função para retornar os dados da tabela de times
    //axios serve pra fazer consumo de api, ele retorna o conjunto de informações
    //se comunica com o backend, pega os dados do time e tras pra dentro no state
    useEffect(
        () => {
            axios.get('http://localhost:3003/globalhitss/times')
                .then(
                    res => {
                        const times = res.data;
                        setState({ times })
                    }
                )
        }, []
    );
    console.log(state);
    const { times } = state;
    return (
        <>
            <h3>Times</h3>
            <Link to={'/inserirTime'}>Adicionar</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Mais Informações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        times.map(

                            (time, key) =>
                            (
                                <tr key={key}>
                                    <td>{time.nome}</td>
                                    <td><Link to={`/detalhesTime/${time.id}`}>Detalhes</Link></td>
                                </tr>
                            )
                        )
                    }


                </tbody>
            </table>
            <p><Link to='/'>Voltar</Link></p>
        </>
    )
}
