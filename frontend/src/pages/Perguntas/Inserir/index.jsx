import axios from 'axios';
import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function InserirPergunta() {
    const [state, setState] = useState({
        pergunta: {
            idFormulario: '',
            textoPergunta: '',
            tipo: ''
        }
    });
    const [redirect, setRedirect] = useState(false);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setState({
            pergunta: {
                ...state.pergunta, [name]: value
            }
        })
        console.log(name)
        console.log(value)
    }

    

    const handleSubmit = (e) => {
        const req = state.pergunta;
        axios({
            method: 'post',
            url: 'http://localhost:3003/globalhitss/inserirPergunta',
            data: req,
            headers: { "Content-Type": "application/json" }
        }).then(
            data => {
                if (data) {
                    alert("Dados inseridos com sucesso")
                    setRedirect(true);
                }
            }
        ).catch(
            () => { console.log("Não foi possível adicionar os dados") }
        );
        e.preventDefault();
    }

    console.log(state)

    if (redirect) {
        return <Redirect to='/perguntas' />
    } else {
        return (
            <div className="form">
                <h3>Adicionar Pergunta</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>idFormulario</label>
                        <input
                            type='number'
                            name='idFormulario'
                            className='form-control'
                            placeholder="idFormulario"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Pergunta</label>
                        <input
                            type='text'
                            name='textoPergunta'
                            className='form-control'
                            placeholder="pergunta"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo</label>
                        <input
                            type='text'
                            name='tipo'
                            className='form-control'
                            placeholder="tipo da pergunta"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type='submit' className="w-100 btn btn-lg btn-primary">
                        Adicionar
                    </button>
                </form>
                <p><Link to='/perguntas'>Voltar</Link> </p>
            </div>
        )
    }
}
