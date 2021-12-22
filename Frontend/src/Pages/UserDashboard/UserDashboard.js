import './AdminDashboard.css';
import MediciLogo from '../../Assets/Medici_Logo.png';
import AddProduct from '../../components/Admin Dashboard/AddProduct';
import RemoveProduct from '../../components/Admin Dashboard/RemoveProduct';
import { useState } from 'react';
import AddPrescription from '../../components/User Dashboard/AddPrescription';
import Login from '../../components/Admin Dashboard/Login';

function UserDashboard() {
    const [selectedTab, setSelectedTab] = useState("")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <div>
            {!isLoggedIn ? <Login
                setLoggedInUI={setIsLoggedIn}
            /> :
                <div className="dashboard_body primary-font">
                    <div className="dashboard_container">
                        <div className="dashboard_navigation_container">
                            <div className="dashboard_navigation_container_content">
                                <div className="dashboard_navigation_container_content_logo">
                                    <img src={MediciLogo} alt="Medici Logo" width="100px" height="100px" />
                                </div>
                                <div className="dashboard_navigation_container_content_navigation">
                                    <ul className="navigation_list">
                                        <li className="navigation_list_item">
                                            Dashboard
                                        </li>
                                        <li className="navigation_list_item">
                                            <button onClick={() => {
                                                setSelectedTab("add prescription")
                                            }}>
                                                Add Prescription
                                            </button>
                                        </li>
                                    
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="dashboard_content_container">
                            <h3>
                                Dashboard
                            </h3>
                            <hr />
                            
                            {selectedTab === "add prescription" && (
                                <AddPrescription />
                            )}
                        
                        </div>
                    </div>
                </div>}
        </div>

    );
}

export default UserDashboard;