import './dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AddCategory() {
    const [data, setData] = useState({
        category: ""
    })
    const [message, setMessage] = useState("")
    let headers = {'Content-Type': 'application/json',
    'x-access-token': sessionStorage.getItem('x-token')}

    useEffect(() => {
        headers = {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('x-token')
        }
    }, [])

    function handleChange(e) {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    async function addCategory(){
        setMessage("ADDING!!!")
        let response = await axios.post('http://localhost:3000/api/admin/category/create', data, {headers: headers})
        setMessage(response.data.header.message)
    }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Add Category</h4>
                <form className="primary-font form">
                    <div className="col-1">
                        <label>Category Name:</label> <br />
                        <input type="text" name="name" value={data.name} onChange={handleChange}/>
                    </div>
                    <div>
                        <button
                            type='button'
                            onClick={async()=>{
                                await addCategory()
                            }} 
                        >
                            ADD CATEGORY
                        </button>
                    </div>
                </form>
                {message === "" ? <></> : <p>{message}</p>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}