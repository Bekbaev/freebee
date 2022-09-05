import React from 'react'
import { Link } from 'react-router-dom'
import MaterialIcon from 'react-google-material-icons'

const NotAuthorizedHeader = () => {
    return (
        <nav id="w0" className="navbar-inverse navbar-fixed-top navbar" role="navigation">
            <div className="container">
                <div className="navbar-header">
                    <Link to="/" className="navbar-brand">
                        FreeBee
                    </Link>
                    <ul id="w1" className="navbar-nav navnav navbar-right nav">
                        <li>
                            <Link to="/login/" className="flex">
                                <MaterialIcon icon="login" size={30} />
                                <div>Войти</div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NotAuthorizedHeader
