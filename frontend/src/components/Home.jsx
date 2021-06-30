import React, {useState} from 'react';
// import logo from '../assets/logo.png';
import LoginForm from '../pages/Login'

function Home(){
    
    const adminUser = {
        username: "admin",
        password: "admin"
      }
    
      const [user, setUser] = useState({ username: "", password: "" });
      const [error, setError] = useState("");
    
      const Login = details => {
        console.log(details);
        if (details.username === adminUser.username && details.password === adminUser.password) {
          console.log("Logado");
          setUser({
            username: details.username,
            password: details.password,
          })
        } else {
          console.log("Usuario ou senha invalidos")
          setError("Usuario ou senha invalidos")
        }
      }
    
      const Logout = details => {
        console.log("Logout");
        setUser({username: "", password: ""});
      }
    
      // const [state, setState] = useState({
      //   times: []
      // })
    
      return (
        <div className="App">
          {(user.username !== "") ? (
            <div className="welcome">
              <h2>Welcome, <span>{user.username}</span></h2>
              <button onClick={Logout}>Logout</button>
            </div>
          ) : (
               <LoginForm Login={Login} error={error} /> 
            )
          }
        </div>
      )
}

export default Home;