import './registerform.css'

function registerforms() {
    return (
        <form>

            <div className="bodyFonts">
                <label>Enter Username</label>
            </div>

            <div>
                <input type="text" name="Username" />
            </div>

            <div className="bodyFonts">
                <label>Enter Email</label>
            </div>

            <div>
                <input type="text" name="Username" />
            </div>

            <div className="bodyFonts">
                <label>Enter Password</label>
            </div>

            <div>
                <input type="password" name="password" />
            </div>

            <div className="bodyFonts">
                <label>Retype Password</label>
            </div>

            <div>
                <input type="password" name="password" />
            </div>

            <input type="submit" value="Submit" />

        </form>
    )
}

export default registerforms;