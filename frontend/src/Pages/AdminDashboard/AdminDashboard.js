import './AdminDashboard.css';
import MediciLogo from '../../Assets/Medici_Logo.png';
import AddProduct from '../../components/Products/AddProduct';

function AdminDashboard() {
    return (
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
                                    Add Product
                                </li>
                                <li className="navigation_list_item">
                                    Remove Product
                                </li>
                                <li className="navigation_list_item">
                                    Update Product
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
                    <AddProduct />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;