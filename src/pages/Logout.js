import React, { useEffect } from 'react';
//import {logout} from "../requests/authRequests";
import {authenticationService} from "../_services";

function Logout() {

    useEffect(() => {
        authenticationService.logout();
    }, []);

    return (
        <div>
            
        </div>
    )
}

/*
class Logout extends Component {

    componentWillMount() {
        authenticationService.logout();
    }

    render() {
        return (
            <>
            </>
        )
    }
}
*/

export default Logout;
