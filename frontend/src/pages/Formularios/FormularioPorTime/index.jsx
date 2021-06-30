import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function FormulariosPorTime(props) {
    const [formularios, setFormularios] = useState([]);
    const [time, setTime] = useState([]);

    
    useEffect(
        () => {
            
            const {id} = props.match.params;
            console.log(id)
            axios.get(`http://localhost:3003/globalhitss/formsTime/${id}`)
                .then(
                    (res) => {
                        const get = res.data;
                        const formularios = Object.assign(get);
                        setTime(formularios)
                        setFormularios(formularios.users)
                    }
                )
        }, [props.match.params]
    );
    
    
    return (
        <>
            <h3>Formularios de {time.nome}</h3>
            {/* <Link to={`/inserirFormulario/${time.id}`}>Adicionar</Link> */}
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
                        formularios.length > 0 ? (
                            formularios.map(
                                (formulario, index) =>(
                                    <tr key={index}>
                                        <td>{formulario.idTime}</td>
                                        <td>{formulario.tipo}</td>
                                        <td><Link to={`/detalhesFormulario/${formulario.id}`}>Detalhes</Link></td>
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

            <p><Link to={`/detalhesTime/${formularios.id}`}>Voltar</Link></p>
          
        </>
    )
};