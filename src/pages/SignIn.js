import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SignIn extends Component {
    render() {
        return (
            <div className="sign-in-page standalone-page">
                <div className="sign-in-wrapper">
                <div className="sign-in-container">
                    <h4>Sign In</h4>

                    <form className="sign-in-form">
                        <div className="form-group">
                            <input className="form-control" type="email" required placeholder="Email Address"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required placeholder="Password"/>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block">SIGN IN</button>
                        </div>
                    </form>
                </div>
                <div className="sign-in-footer">
                    <p>New to MovieGO?</p>
                    <Link to="/sign-up" className="btn btn-outline-primary btn-block">
                        CREATE A NEW ACCOUNT
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}

export default SignIn;
