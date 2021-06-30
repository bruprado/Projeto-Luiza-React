import axios from 'axios';
import { useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
 
export default function EditarUsuario(props){
    const[state, setState] = useState({
        usuario: {
            nome:'', 
            login:'',
            senha:'',
            gestor: 'true',
            idTime: ''
        }
    });
 
    //tras os dados através do id
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
 
    const[redirect, setRedirect] = useState(false);
 
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value  = e.target.value;
        setState({
            usuario:{
                ...state.usuario, [name]: value
            }
        })
    }
 
    const handleSubmit = (e) => {
        const req = state.usuario;
        const {id} = state.usuario;
        axios({
            method: 'put',
            url:`http://localhost:3003/globalhitss/editarUsuario/${id}`,
            data: req,
            headers:{"Content-Type": "application/json"}
        }).then(
            data => {
                if(data){
                    alert("Dados Editados com sucesso");
                    setRedirect(true);
                }
            }
        ).catch(
            () => {console.log("Não foi possivel editar")}
        );
        e.preventDefault();
    }
    const {usuario} = state;
    console.log(state);
    
    if(redirect){
        return <Redirect to='/usuarios' />
    }else{
        return(
            <div className="form">
                <h3>Editar Usuário</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nome</label>
                        <input 
                            type='text'
                            name='nome'
                            className='form-control'
                            placeholder="nome"
                            required
                            value={usuario.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Login</label>
                        <input 
                            type='text'
                            name='login'
                            className='form-control'
                            placeholder="login"
                            required
                            value={usuario.login}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Senha</label>
                        <input 
                            type='password'
                            name='senha'
                            className='form-control'
                            placeholder="senha"
                            required
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-md-3">
                        <label>Gestor</label>
                        <input 
                            type='radio'
                            name='gestor'
                            className='col-md-2'
                            required
                            value="true"
                            checked={state.usuario.gestor === 'true' || state.usuario.gestor === true} 
                            onChange={handleInputChange}
                        />
                        <label>Colaborador</label>
                        <input 
                            type='radio'
                            name='gestor'
                            className='col-md-2'
                            required
                            value="false"
                            checked={state.usuario.gestor === 'false' || state.usuario.gestor === false} 
                            onChange={handleInputChange}
                        />
                        <div className="form-group">
                            <label>idtime</label>
                            <input
                                type='text'
                                name='idTime'
                                className='form-control'
                                placeholder="idTime"
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type='submit' className="w-100 btn btn-lg btn-primary">
                        Editar
                    </button>
                </form>
                <p><Link to='/usuarios'>Voltar</Link> </p>
            </div>
        )
    }  
}
