import { useState } from "react";
import "./userforms.css";

function Userforms() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="formContainer">
            <form>

                <div className="emailContainer primary-font">
                    <label className="loginLabel">Username or Email</label>
                    <br />
                    <input type="email" name="email" className="loginInput"
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="passwordContainer primary-font">
                    <label className="loginLabel">Password</label>
                    <br />
                    <input type="password" name="password" className="loginInput"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="forgotPasswordContainer">
                    <p className="forgotPasswordContainer_p">
                        Forgot password?
                    </p>
                </div>

                <input type="submit" value="Login" className="loginButton primary-font"
                    disabled={!validateForm()} />

            </form>
        </div>
    );
}

export default Userforms;
