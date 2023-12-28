import React, { useContext, useRef, useState } from 'react'
import './Auth.css';
import { Link } from 'react-router-dom';
import Context from '../store/Context';

const Auth = () => {
    const ctx = useContext(Context);
    const [onToggle, setOnToggle] = useState(true);
    const [forgot, setForgot] = useState(false)
    const emailref = useRef('')
    const passref = useRef('')
    const for_pass_emailRef = useRef('')
    // const cnfPassref = useRef('')

    const swithModeHandler = () => {
        setOnToggle(prev => !prev)
    };

    const forgotPassHandler = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBAX17nBJFg6o4XXPR5zeqGA_dM1JM5XrM', {
            method: 'POST',
            body: JSON.stringify({
                email: for_pass_emailRef.current.value,
                requestType: "PASSWORD_RESET"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.ok){
                return res.json()
            } 
            // else if(enteredPass !== enteredCnfPass){
            //     throw new Error("Password and Confirmed Password Doesn't match")   
            // } 
            else {
                return res.json().then(data => {
                    let errmsg = 'Authentication Failed';
                    if(data && data.error && data.error.message){
                        errmsg = data.error.message
                    };
                    throw new Error(errmsg)
                    
                })
            }
        }).then(data => console.log(data))
        .catch(err => alert(err.message))
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const enteredEmail = emailref.current.value
        const enteredPass = passref.current.value
        // const enteredCnfPass = cnfPassref.current.value

        const changedEmail = (enteredEmail.replace('@', '')).replace('.', '').replace('.', '')

        let url;
        if(onToggle){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAX17nBJFg6o4XXPR5zeqGA_dM1JM5XrM'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAX17nBJFg6o4XXPR5zeqGA_dM1JM5XrM'
        }
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPass,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if(res.ok){
                return res.json()
            } 
            // else if(enteredPass !== enteredCnfPass){
            //     throw new Error("Password and Confirmed Password Doesn't match")   
            // } 
            else {
                return res.json().then(data => {
                    let errmsg = 'Authentication Failed';
                    if(data && data.error && data.error.message){
                        errmsg = data.error.message
                    };
                    throw new Error(errmsg)
                    
                })
            }
        }).then(data => {
            console.log(data)
            ctx.login(data.idToken, changedEmail)
        })
        .catch(err => alert(err.message))
        // ctx.filterMail(changedEmail);
        
    };

  return (
    <div className='form-box'>
        <div className='button-box'>
            <div id={onToggle ? 'btn' : 'btn-login'} />
            <button type='button' className='toggle-button' onClick={swithModeHandler}>Signup</button>
            <button type='button' className='toggle-button' onClick={swithModeHandler}>Login</button>
        </div>
        <form className='input-group' id='signup' onSubmit={submitHandler}>
            {!forgot && <><div>
                <label htmlFor='email'>Email Id: </label>
                <input type='email' id='email' ref={emailref} className='input-field'></input>
            </div>
            <div>
                <label htmlFor='password'>Password: </label>
                <input type='password' id='password' ref={passref} className='input-field'></input>
            </div>
            {/* <div>
                <label htmlFor='cnfpass'>Confirm Password: </label>
                <input type='password' id='cnfpass' ref={cnfPassref} className='input-field'></input>
            </div> */}
            {!onToggle && <Link to='/forgot-password' onClick={() => setForgot(true)}>Forgot Password?</Link>}
            <button type='Submit' className='submit-button'>{onToggle ? 'Signup' : 'Login'}</button></>}
            {forgot && <>
            <div>
                <label htmlFor='reg-email'>Enter your Registered Email id: </label>
                <input type='email' id='reg-email' ref={for_pass_emailRef}></input>
            </div><br></br>
            <Link to='/login' onClick={() => setForgot(false)}>Back to Login</Link><br></br>
            <span className='submit-button' onClick={forgotPassHandler}>SendLink</span>
            
            </>}
        </form>
    </div>
  )
}

export default Auth