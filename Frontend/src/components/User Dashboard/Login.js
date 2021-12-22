import React, {useState} from 'react'
import axios from 'axios';

import LoginStyle from './LoginStyle.css'

export default function Login({setLoggedInUI}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isSending, setIsSending] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [errorVisible, setErrorVisible] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Main function that calls the login api
    async function loginAPI(emailField, passwordField){
        // To avoid pressing on login button while request is being performed
        if(isSending)
            return
        
        setIsSending(true)
        if(emailField == '' || passwordField == ''){
            setErrorMessage("Empty Fields")
            setErrorVisible(true)
            setIsSending(false)
            return
        }

        try {
            // let response = await fetch('http://localhost:3000/api/authentication/login', 
            // {
            //     method : 'post',
            //     headers : {'Content-Type': 'application/json'},
            //     body : JSON.stringify({
            //         email : emailField,
            //         password : passwordField
            //     })
            // })
            let response = await axios.post('http://localhost:3000/api/authentication/login', {
                'email': emailField, 
                'password': passwordField
            }, {headers: {
                'Content-Type': 'application/json'
            }})
            let json = response.data
            await verifyLogin(json)
            setIsSending(false)
        } catch (error) {
            console.log(error)
            setIsSending(false)
        }
    }

    // Function that checks the response json headers for what error message it has
    const verifyLogin = async (response) => {
            if(response.header.error == 0){
                setErrorMessage("SUCCESS")
                setErrorVisible(false)

                sessionStorage.setItem('x-token', response.header.token)
                // localStorage.setItem('x-token', response.header.token)

                setIsLoggedIn(true)

                setLoggedInUI(true)
            }
            // Email not found error
            else if(response.header.error == 1){
                setErrorMessage("Email ID does not exist")
                setErrorVisible(true)
            }
            // incorrect password
            else if(response.header.error == 2){
                setErrorMessage("Incorrect password")
                setErrorVisible(true)
            }
            // database error
            else if(response.header.error == 3){
                setErrorMessage("Database error. Please try again later")
                setErrorVisible(true)
            }
            // other error
            else{
                setErrorMessage("Error. Try again later")
                setErrorVisible(true)
            }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        await loginAPI(email, password)
    }

    return(
        <div className= "Login">
            <h1 style= {LoginStyle.h1}>LOGIN</h1>
            {/* INPUT AREA */}
           <form onSubmit= {handleSubmit}>
                <label className= "Label">
                    <p>EMAIL ID</p>
                    <input className= "Input" type="text" onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>PASSWORD</p>
                    <input className= "Input" type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button className= "Button" type="submit">LOGIN</button>
                </div>
            </form>
{/*             
            <div>
                <button className= "Button" onClick= {() => history.push('/signup')}>SIGNUP</button>
            </div> */}

            {/* {isLoggedIn ? <Link to= "/dashboard">{console.log("SUCCESS")}</Link>: null} */}

            {/* ERROR MESSAGE AREA */}
            <div className= "Error-Message">
                {errorVisible ? <h3>{errorMessage}</h3> : null}
            </div>
        </div>
    )

}