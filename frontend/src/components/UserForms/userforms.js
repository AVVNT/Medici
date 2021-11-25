import "./userforms.css";

function userforms() {
    return (
        <div className="formContainer">
            <form>

                <div className="emailContainer primary-font">
                    <label className="loginLabel">Username or Email</label>
                    <br />
                    <input type="text" name="Username" className="loginInput" />
                </div>

                <div className="passwordContainer primary-font">
                    <label className="loginLabel">Password</label>
                    <br />
                    <input type="password" name="password" className="loginInput" />
                </div>

                <div className="forgotPasswordContainer">
                    <p className="forgotPasswordContainer_p">
                        Forgot password?
                    </p>
                </div>

                <input type="submit" value="Login" className="loginButton primary-font" />

            </form>
        </div>
    );
}

export default userforms;
