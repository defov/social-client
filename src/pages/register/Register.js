import axios from '../../app/axios';
import React, { useRef } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const email = useRef()
    const username = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault();
        if(confirmPassword.current.value !== password.current.value) {
            confirmPassword.current.setCustomValidity("Password don't match!");
        } else {
            const user = {
                email: email.current.value,
                username: username.current.value,
                password: password.current.value
            }

            try {
                await axios.post('/auth/register', user)
                redirectToLogin(e)
            } catch(err) {
                console.log(err)
            }
        }
    }

    const redirectToLogin = (e) => {
        e.preventDefault();
        navigate('/login', { replace: true });
    }

    return (
        <div className='register'>
            <div className='registerWrapper'>
                <div className='registerLeft'>
                    <h3 className='registerLogo'>Social App</h3>
                    <span className='registerDesc'>
                        Connect with friends and the world around you on Social App.
                    </span>
                </div>
                <div className='registerRight'>
                    <form className='registerBox' onSubmit={handleRegister}>
                        <input 
                            type="email" 
                            ref={email}
                            required
                            className="registerInput"
                            placeholder='Email' 
                        />
                        <input 
                            type="text"
                            ref={username} 
                            required
                            className="registerInput"
                            placeholder='Username' 
                        />
                        <input 
                            type="password"
                            ref={password} 
                            required
                            className="registerInput"
                            placeholder='Password' 
                            minLength={6}
                        />
                        <input 
                            type="password"
                            ref={confirmPassword} 
                            required
                            className="registerInput"
                            placeholder='Confirm Password' 
                            minLength={6}
                        />
                        <button type='submit' className='registerButton'>Sign Up</button>
                        <button type='button' onClick={redirectToLogin} className='registerLoginButton'>Already have an account?</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
