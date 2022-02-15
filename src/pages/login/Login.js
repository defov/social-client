import React, { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../app/apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const email = useRef(null)
    const password = useRef(null);

    const { isFetching, error, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        loginCall({ 
            email: email.current.value, 
            password: password.current.value 
        }, dispatch)
    }

    const redirectToRegister = (e) => {
        e.preventDefault();
        navigate('/register', { replace: true })
    }

    return (
        <div className='login'>
            <div className='loginWrapper'>
                <div className='loginLeft'>
                    <h3 className='loginLogo'>Social App</h3>
                    <span className='loginDesc'>
                        Connect with friends and the world around you on Social App.
                    </span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleLogin}>
                        <input 
                            type="email" 
                            className="loginInput"
                            required
                            placeholder='Email' 
                            ref={email}
                        />
                        <input 
                            type="password" 
                            className="loginInput"
                            required
                            minLength={6}
                            placeholder='Password'
                            ref={password} 
                        />
                        <button 
                            className='loginButton' 
                            disabled={isFetching} 
                            type='submit'>
                                {isFetching ? <CircularProgress color="primary" size="20px" /> : 'Log In'}
                            </button>
                        <span className='loginForgotPassword'>Forgot Password?</span>
                        <button type='button' onClick={redirectToRegister} className='loginRegisterButton'>Create a new account</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
