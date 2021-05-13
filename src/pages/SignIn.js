import React from 'react';
import { Link } from 'react-router-dom';
import { authenticationService } from '../_services';
import {message} from "antd";
import useInput from "../hooks/useInput";

function SignIn(props) {
    
    if (authenticationService.currentUserValue) { 
        props.history.push('/');
        message.error("You are already logged in");
    }

    const [email, emailBind, emailReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");

    const onSubmit = async (e) => {
        try {
            e.preventDefault();
            authenticationService.login(email, password)
            .then(
                user => {
                    const { from } = props.location.state || { from: { pathname: "/" } };
                    props.history.push(from);
                    window.location.reload();
                },
                error => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="sign-in-page standalone-page">
            <div className="sign-in-wrapper">
            <div className="sign-in-container">
                <h4>Sign In</h4>

                <form className="sign-in-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control" type="email" required placeholder="Email Address" name="email" value={email} onChange={emailBind.onChange}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Password" name="password" value={password}
                        onChange={passwordBind.onChange}/>
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

/*
class SignIn extends Component {

    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) { 
            this.props.history.push('/');
            message.error("You are already logged in");
        }
    }

    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    onSubmit = async (e) => {
        try {
            e.preventDefault();
            const {email, password} = this.state;
            authenticationService.login(email, password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" } };
                    this.props.history.push(from);
                    window.location.reload();
                },
                error => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.log(error);
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {onChange, onSubmit} = this;
        const {email, password} = this.state;

        return (
            <div className="sign-in-page standalone-page">
                <div className="sign-in-wrapper">
                <div className="sign-in-container">
                    <h4>Sign In</h4>

                    <form className="sign-in-form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <input className="form-control" type="email" required placeholder="Email Address" name="email" value={email} onChange={onChange}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required placeholder="Password" name="password" value={password}
                            onChange={onChange}/>
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
*/

export default SignIn;
