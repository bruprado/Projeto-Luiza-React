import axios from 'axios';
import { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';

export default function InserirFormulario() {
    const [state, setState] = useState({
        formulario: {
            idTime: '',
            tipo: ''
        }
    });
    const [redirect, setRedirect] = useState(false);

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({
            formulario: {
                ...state.formulario, [name]: value
            }
        })
    }

    const handleSubmit = (e) => {
        const req = state.formulario;
        axios({
            method: 'post',
            url: 'http://localhost:3003/globalhitss/inserirFormulario',
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
        return <Redirect to='/formularios' />
    } else {
        return (
            <div className="form">
                <h3>Adicionar Formulário</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>idTime</label>
                        <input
                            type='text'
                            name='idTime'
                            className='form-control'
                            placeholder="idTime"
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
                            placeholder="tipo"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type='submit' className="w-100 btn btn-lg btn-primary">
                        Adicionar
                    </button>
                </form>
                <p><Link to='/formularios'>Voltar</Link> </p>
            </div>
        )

    }

}
