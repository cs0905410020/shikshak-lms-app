import { Route, Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles,children, ...rest }) => {
    const {auth} = useAuth();
console.log(auth,'auth',allowedRoles,allowedRoles?.includes(auth?.role))
    return (
        <Route
            {...rest}
            render={({location}) =>
                 allowedRoles?.includes(auth?.role) ? (
                    children
                ) : auth?.user ? (
                    <Redirect
                        to={{
                            pathname: "/unauthorized",
                            state: {from: location}
                        }}
                    />
                ) : '' /*<Redirect
                    to={{
                        pathname: "/login",
                        state: {from: location}
                    }}
                />*/
            }
        />
    );
}

export default RequireAuth;
