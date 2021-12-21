import './header.css';
import MediciLogo from '../../Assets/Medici_Logo.png';

function header() {
    return (
        <div className='headercontainer secondary-font'>
            <div className='headersubcontainer'>
                <div className='logo-container'>
                    <img src={MediciLogo} alt="Medici Logo" width="100px" height="100px" />
                </div>
                <div className='search-container'>
                    <input type="text" placeholder='Search for ...' />
                </div>
                <div className='navbar-container'>
                    <nav className='navbar'>
                        <a className='navbarlink'>Home</a>
                        <a className='navbarlink'>Products</a>
                        <a className='navbarlink'>Login</a>
                        <button className='navbarlink navbarbutton secondary-font'>
                            Login
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default header;