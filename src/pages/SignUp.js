import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class SignUp extends Component {
    render() {
        return (
            <div className="sign-up-page standalone-page">
                <div className="sign-in-wrapper">
                <div className="sign-in-container">
                    <h4>Create Account</h4>

                    <form className="sign-in-form">
                        <div className="form-group">
                            <input className="form-control" type="text" required placeholder="Username"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" required placeholder="Email Address"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required placeholder="Confirm Password"/>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block">CREATE ACCOUNT</button>
                        </div>
                    </form>
                </div>
                <div className="sign-in-footer">
                    <p>Already have an account?</p>
                    <Link to="/sign-in" className="btn btn-outline-primary btn-block">
                        SIGN IN
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}

export default SignUp;
