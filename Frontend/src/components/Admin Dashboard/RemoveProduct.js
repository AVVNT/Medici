import './dashboard.css';
import ListItems from './components/ListItems';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RemoveProduct() {
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [message, setMessage] = useState("")
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdkOGUwYTM2YjM5YmE2MzVjZTI5MzQiLCJpYXQiOjE2Mzk5MjY4OTEsImV4cCI6MTY0MDAxMzI5MX0.kY-joLUoAssNHCAkINf2USZZPtK4TgUvleYpkT_3I7g'
    }

    useEffect(() => {
        async function fetchMyAPI() {
            await getCategories()
        }
        fetchMyAPI()
    }, [])

    // ADD PAGINATION FEATURE
    useEffect(() => {
        async function fetchMyAPI() {
            await getProducts(selectedCategory, 1)
        }
    
        fetchMyAPI()
    }, [selectedCategory])

    async function getCategories(){
        let response = await axios.get('http://localhost:3000/api/admin/category/getall')
        setCategories(response.data.data)
    }

    async function getProducts(category, page){
        let response = await axios.get(`http://localhost:3000/api/listing/${category}/${page}`)
        setProducts(response.data.body?.data)
    }

    async function removeProduct(category, productId){
        setMessage("Removing")
        let body = {
            'category' : category,
            '_id' : productId
        }
        console.log(body);
        let response = await axios.post('http://localhost:3000/api/admin/products/remove', body, {headers: headers})
        setMessage(response.data.header.message)
    }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Remove Products</h4>
                <p>Select Category</p>
                <select
                    name='selectedCategory'
                    value={selectedCategory}
                    onChange={(e)=>{
                        setSelectedCategory(e.target.value)
                    }}
                >
                    {categories.map(item => (
                        <option
                            key={item._id}
                            value={item.name}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
                {products && <ListItems
                    dataArray={products}
                    category={selectedCategory}
                    buttonFunction={removeProduct}
                    buttonText="Remove"
                />}
                {message === "" ? <></> : <h1>{message}</h1>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}