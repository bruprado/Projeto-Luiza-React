import {Link} from 'react-router-dom';
import './Header.css';
import React from 'react';

function Header(){
    return(
        <>
            <nav className='navbar navbar-expand navbar-dark bg-dark py-3'>
                <div className="container">
                    <Link to='/' className='navbar-brand'>CRUD</Link>

                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-3">
                            <li className="nav-item">
                                <Link to="/times">Times</Link>
                                <Link to="/usuarios">Usuarios</Link>
                                <Link to="/formularios">Formulários</Link>
                                <Link to="/perguntas">Perguntas</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header;