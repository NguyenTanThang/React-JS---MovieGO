import React from 'react'
import { Link } from 'react-router-dom';
import {signUp} from "../requests";
import {message} from "antd";
import useInput from "../hooks/useInput";

function SignUp(props) {

    const [username, usernameBind, usernameReset] = useInput("");
    const [email, emailBind, emailReset] = useInput("");
    const [confirmPassword, confirmPasswordBind, confirmPasswordReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");

    const onSubmit = async (e) => {
        e.preventDefault();
        message.destroy();

        if (password !== confirmPassword) {
            return message.error("Confirm password must be the same as password");
        }

        const {success} = await signUp({
            username, email, password
        });

        if (success) {
            props.history.push("/sign-in");
        }
    }

    return (
        <div className="sign-up-page standalone-page">
            <div className="sign-in-wrapper">
            <div className="sign-in-container">
                <h4>Create Account</h4>

                <form className="sign-in-form" onSubmit={onSubmit}>
                    <div className="form-group">
                        <input className="form-control" type="text" required placeholder="Username" name="username" onChange={usernameBind.onChange} value={username}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="email" required placeholder="Email Address" name="email" onChange={emailBind.onChange} value={email}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Password" name="password" onChange={passwordBind.onChange} value={password}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Confirm Password" name="confirmPassword" onChange={confirmPasswordBind.onChange} value={confirmPassword}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block">CREATE ACCOUNT</button>
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

/*
class SignUp extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    }

    onSubmit = async (e) => {
        e.preventDefault();
        message.destroy();
        const {username, email, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            return message.error("Confirm password must be the same as password");
        }

        const {success} = await signUp({
            username, email, password
        });

        if (success) {
            this.props.history.push("/sign-in");
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {onChange, onSubmit} = this;
        const {username, email, password, confirmPassword} = this.state;

        return (
            <div className="sign-up-page standalone-page">
                <div className="sign-in-wrapper">
                <div className="sign-in-container">
                    <h4>Create Account</h4>

                    <form className="sign-in-form" onSubmit={onSubmit}>
                        <div className="form-group">
                            <input className="form-control" type="text" required placeholder="Username" name="username" onChange={onChange} value={username}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="email" required placeholder="Email Address" name="email" onChange={onChange} value={email}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required placeholder="Password" name="password" onChange={onChange} value={password}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required placeholder="Confirm Password" name="confirmPassword" onChange={onChange} value={confirmPassword}/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary btn-block">CREATE ACCOUNT</button>
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
*/

export default SignUp;