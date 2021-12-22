import './dashboard.css';
import ListOrders from './components/ListOrders';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Orders() {
    const [orders, setOrders] = useState(null)
    const [searchFilter, setSearchFilter] = useState('')
    const [filteredOrders, setFilteredOrders] = useState(null)
    const [filter, setFilter] = useState('')
    const [message, setMessage] = useState("")
    let headers = {'Content-Type': 'application/json',
    'x-access-token': sessionStorage.getItem('x-token')}

    useEffect(() => {
        async function fetchMyAPI() {
            await getOrders()
        }

        headers = {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('x-token')
        }

        console.log(headers)

        fetchMyAPI()
    }, [])

    useEffect(() => {
        if (filteredOrders != null)
            getSearchOrders();
    }, [searchFilter]);

    async function getOrders() {
        let response = await axios.get('http://localhost:3000/api/admin/orders/getall', { headers: headers })
        setOrders(response.data.data)
        setFilteredOrders(response.data.data)
    }

    async function getOrdersWithFilter(){
        let response = await axios.get('http://localhost:3000/api/admin/orders/getorders', { headers: headers, params: {'filter': filter} })
        console.log(response);
    }

    function getSearchOrders() {
        if (searchFilter === "") {
            setFilteredOrders(orders);
        } else {
            let newArray = orders.filter(function (el) {
                return String(el._id).includes(searchFilter) || String(el.address).includes(searchFilter) || String(el.phone_number).includes(searchFilter);
            });
            setFilteredOrders(newArray);
        }
    }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Orders</h4>
                {/* SEARCH */}
                <div>
                    <label>Search</label>
                    <input
                        type="text"
                        value={searchFilter}
                        name="searchFilter"
                        onChange={(e) => {
                            setSearchFilter(e.target.value);
                        }}
                    />
                </div>
                {/* <p>Filter</p>
                <select
                    name='filter'
                    value={filter}
                    onChange={(e)=>{
                        setFilter(e.target.value)
                        getOrdersWithFilter(filter)
                    }}
                >
                    <option></option>
                </select> */}
                {filteredOrders == null ? <p>LOADING</p>
                    :
                    <ListOrders
                        dataArray={filteredOrders}
                    />
                }

                {message === "" ? <></> : <p>{message}</p>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}