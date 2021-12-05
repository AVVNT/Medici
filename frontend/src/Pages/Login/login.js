import UserForms from '../../components/UserForms/userforms';
import './login.css';
import MediciLogo from '../../Assets/Medici_Logo.png';

function login() {
    return (
        <div className="body">
            <div className="overlay">
                <div className="mainContent">
                    <div className="sectionOne">
                        <div className="sectionOne_image_container">

                        </div>
                        <div className="sectionOne_content_container">
                            <img ClassName="bodyLogo" src={MediciLogo} alt="Medici Logo" width="200px" height="200px" />
                            <p className="sectionOne_content_p primary-font">
                                Welcome to Medici
                            </p>
                            <UserForms />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default login;