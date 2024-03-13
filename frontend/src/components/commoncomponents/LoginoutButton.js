import React, { useContext } from 'react';
import { Button, NavLink } from 'react-bootstrap';
import { HOME_ROUTE, LOGIN_ROUTE } from '../../helpers/consts';
import { Context } from '../..';
import { useNavigate } from 'react-router-dom';

const LoginoutButton = () => {
    const { user } = useContext(Context);
    const history = useNavigate();

    const logOut = () => {
        localStorage.setItem('token', '');
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        history(HOME_ROUTE);
        console.log("ONCLICK");
    };

    return (
        <>
            {user.isAuth ? (
                <Button variant='outline-danger' onClick={logOut}>
                    Logout
                </Button>
            ) : (
                <Button variant='outline-danger'>
                    <NavLink href={LOGIN_ROUTE}>Login</NavLink>
                </Button>
            )}
        </>
    );
};

export default LoginoutButton;
