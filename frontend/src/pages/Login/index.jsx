import React, {useState} from 'react'

function LoginForm({Login, error}) {
    const [details, setDetails] = useState({login: "", senha: ""});

    const submitHandler = e => {
        e.preventDefault();

        //Login(details);
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                {(error !== "") ? (<div className="error">{error}</div>) : ""}
                <div className="form-group">
                    <label htmlFor="login">Usuario:</label>
                    <input type="text" name="login" id="login" onChange={e => setDetails({...details, login: e.target.value})} value={details.login} />
                </div>
                <div className="form-group">
                    <label htmlFor="senha">Senha:</label>
                    <input type="senha" name="senha" id="senha" onChange={e => setDetails({...details, senha: e.target.value})} value={details.senha} />
                </div>
                <input type="submit" value="LOGIN" />
            </div>
        </form>
    )
}

export default LoginForm;
