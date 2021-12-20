import './AdminDashboard.css';
import MediciLogo from '../../Assets/Medici_Logo.png';
import AddProduct from '../../components/Admin Dashboard/AddProduct';
import RemoveProduct from '../../components/Admin Dashboard/RemoveProduct';
import { useState } from 'react';
import UpdateProduct from '../../components/Admin Dashboard/UpdateProduct';

function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState("")

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
                                    <button onClick={()=>{
                                        setSelectedTab("add product")
                                    }}>
                                        Add Product
                                    </button>
                                </li>
                                <li className="navigation_list_item">
                                    <button onClick={()=>{
                                        setSelectedTab("remove product")
                                    }}>
                                        Remove Product
                                    </button>
                                </li>
                                <li className="navigation_list_item">
                                    <button onClick={()=>{
                                        setSelectedTab("update product")
                                    }}>
                                        Update Product
                                    </button>
                                </li>
                                <li className="navigation_list_item">
                                    <button onClick={()=>{
                                        setSelectedTab("add category")
                                    }}>
                                        Add Category
                                    </button>
                                </li>
                                <li className="navigation_list_item">
                                    <button onClick={()=>{
                                        setSelectedTab("remove category")
                                    }}>
                                        Remove Category
                                    </button>
                                </li>
                                <li className="navigation_list_item">
                                    <button onClick={()=>{
                                        setSelectedTab("edit category")
                                    }}>
                                        Edit Category
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
                    {selectedTab === "add product" && (
                        <AddProduct />
                    )}
                    {selectedTab === "remove product" && (
                        <RemoveProduct />
                    )}
                    {selectedTab === "update product" && (
                        <UpdateProduct />
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;