import axios from 'axios';
import { useState, useEffect} from 'react';
import {Redirect, Link} from 'react-router-dom';
 
export default function EditarTime(props){
    const[state, setState] = useState({
        time: {
            nome:''
        }
    });
 
    //tras os dados através do id
    useEffect(
        ()=>{
            const {id} = props.match.params;
            
            axios.get(`http://localhost:3003/globalhitss/times/${id}`)
           .then(
               res => {
                   const time = res.data;
                   setState({time})
               }
           )
        },[props.match.params]
    )
 
    const[redirect, setRedirect] = useState(false);
 
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value  = e.target.value;
        setState({
            time:{
                ...state.time, [name]: value
            }
        })
    }
 
    const handleSubmit = (e) => {
        const req = state.time;
        const {id} = state.time;
        axios({
            method: 'put',
            url:`http://localhost:3003/globalhitss/editarTime/${id}`,
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
    const {time} = state;
    console.log(state);
    
    if(redirect){
        return <Redirect to='/times' />
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
                            value={time.nome}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type='submit' className="w-100 btn btn-lg btn-primary">
                        Editar
                    </button>
                </form>
                <p><Link to='/times'>Voltar</Link> </p>
            </div>
        )
    }  
}
