import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PerguntasPorTime(props) {
    const [perguntas, setPerguntas] = useState([]);
    const [time, setTime] = useState([]);

    
    useEffect(
        () => {
            
            const {id} = props.match.params;
            console.log(id)
            axios.get(`http://localhost:3003/globalhitss/formsTime/${id}`)
                .then(
                    (res) => {
                        const get = res.data;
                        const perguntas = Object.assign(get);
                        setTime(perguntas)
                        setPerguntas(perguntas.users)
                    }
                )
        }, [props.match.params]
    );
    
    
    return (
        <>
            <h3>Perguntas de {time.nome}</h3>
            {/* <Link to={`/inserirPergunta/${time.id}`}>Adicionar</Link> */}
            <Link to="/times" className="btn btn-success mt-3">Voltar</Link>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Tipo</th>
                        <th>Mais Informações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        perguntas.length > 0 ? (
                            perguntas.map(
                                (pergunta, index) =>(
                                    <tr key={index}>
                                        <td>{pergunta.idTime}</td>
                                        <td>{pergunta.tipo}</td>
                                        <td><Link to={`/detalhesPergunta/${pergunta.id}`}>Detalhes</Link></td>
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

            <p><Link to={`/detalhesTime/${perguntas.id}`}>Voltar</Link></p>
          
        </>
    )
};