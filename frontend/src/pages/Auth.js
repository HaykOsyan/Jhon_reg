import React, { useContext, useEffect, useState } from 'react';
import { Form, Container, FormControl, Button, Row, NavLink } from 'react-bootstrap';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, TEST_ROUTE } from '../helpers/consts';
import { useLocation, useNavigate } from 'react-router-dom';
import { login, registration } from '../http/userApi';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
    const { user } = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const click = async () => {
        try {
            let data;

            // Check if it's a login and email/password exist
            if (isLogin) {
                if (email && password) {
                    console.log('Email and password are present');
                }
                data = await login(email, password);
                console.log(data)
            } else {
                data = await registration(email, password);
            }

            // Check for errors in the response
            if (data.errors) {
                if (data.errors[0].path === 'password') {
                    setErrorPassword(data.errors[0].msg);
                } else {
                    setErrorEmail(data.errors[0].msg);
                }
            } else {
                // Set user, authentication, and navigate based on role
                user.setUser(data);
                user.setIsAuth(true);

                navigate(TEST_ROUTE);

                // Reset error messages on successful submission
                setErrorPassword('');
                setErrorEmail('');
            }

        } catch (error) {
            // Display a generic error message
            alert('An error occurred. Please try again.');
        }
    };

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                click();
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    },);

    return (
        <Container className='d-flex justify-content-center mt-3'>
            <Form className='w-50'>
                <FormControl
                    type="email"
                    placeholder="Enter email"
                    className='mt-3'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                {/* showing error for email */}
                {errorEmail ? <label className='text-danger mt-0'>{errorEmail}</label> : ''}
                <FormControl
                    type="password"
                    placeholder="Password"
                    className='mt-3'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                {/* showing error for password */}
                {errorPassword ? <label className='text-danger mt-0'>{errorPassword}</label> : ''}
                <Row className='d-flex justify-content-around'>
                    {isLogin ?
                        <div className='d-flex'>
                            No Account? <NavLink href={REGISTRATION_ROUTE}>Register</NavLink>
                        </div>
                        :
                        <div className='d-flex'>
                            Have an Account? <NavLink href={LOGIN_ROUTE}>Login</NavLink>
                        </div>
                    }

                    <Button
                        variant='outline-danger'
                        onClick={click}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Row>

            </Form>
        </Container>
    );
});

export default Auth;