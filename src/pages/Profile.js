import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import {updateProfile} from "../requests";
import {message} from "antd";
import { authenticationService } from '../_services';
import useInput from "../hooks/useInput";

function Profile() {

    const [username, usernameBind, usernameReset] = useInput(authenticationService.currentUserValue.username);
    const [confirmPassword, confirmPasswordBind, confirmPasswordReset] = useInput("");
    const [password, passwordBind, passwordReset] = useInput("");

    const onSubmit = async (e) => {
        e.preventDefault();
        message.destroy();
        const {username, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            return message.error("Confirm password must be the same as password");
        }

        const {success} = await updateProfile({
            username, password
        });

        if (success) {
            this.props.history.push("/");
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
                        <input className="form-control" type="password" required placeholder="New Password" name="password" onChange={passwordBind.onChange} value={password}/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" type="password" required placeholder="Confirm New Password" name="confirmPassword" onChange={confirmPasswordBind.onChange} value={confirmPassword}/>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary btn-block">SAVE CHANGES</button>
                    </div>
                </form>
            </div>
            <div className="sign-in-footer">
                <p>Don't want to change your profile?</p>
                <Link to="/" className="btn btn-outline-primary btn-block">
                    GO BACK HOME
                </Link>
            </div>
            </div>
        </div>
    )
}

/*
class Profile extends Component {

    state = {
        username: authenticationService.currentUserValue.username,
        password: "",
        confirmPassword: ""
    }

    onSubmit = async (e) => {
        e.preventDefault();
        message.destroy();
        const {username, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {
            return message.error("Confirm password must be the same as password");
        }

        const {success} = await updateProfile({
            username, password
        });

        if (success) {
            this.props.history.push("/");
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {onChange, onSubmit} = this;
        const {username, password, confirmPassword} = this.state;

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
                            <input className="form-control" type="password" required placeholder="New Password" name="password" onChange={onChange} value={password}/>
                        </div>
                        <div className="form-group">
                            <input className="form-control" type="password" required placeholder="Confirm New Password" name="confirmPassword" onChange={onChange} value={confirmPassword}/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary btn-block">SAVE CHANGES</button>
                        </div>
                    </form>
                </div>
                <div className="sign-in-footer">
                    <p>Don't want to change your profile?</p>
                    <Link to="/" className="btn btn-outline-primary btn-block">
                        GO BACK HOME
                    </Link>
                </div>
                </div>
            </div>
        )
    }
}
*/

export default Profile;

