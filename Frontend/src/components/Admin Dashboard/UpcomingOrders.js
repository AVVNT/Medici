import './dashboard.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ListPrescription from './components/ListPrescription';

export default function UpcomingOrders() {
    const [prescriptions, setPrescriptions] = useState(null)
    // const [searchFilter, setSearchFilter] = useState('')
    // const [filteredOrders, setFilteredOrders] = useState(null)
    // const [filter, setFilter] = useState('')
    const [message, setMessage] = useState("")
    let headers = {}

    useEffect(() => {
        async function fetchMyAPI() {
            await getPrescriptions()
        }

        headers = {
            'Content-Type': 'application/json',
            'x-access-token': sessionStorage.getItem('x-token')
        }

        console.log(headers)

        fetchMyAPI()
    }, [])

    // useEffect(() => {
    //     if (filteredOrders != null)
    //         getSearchOrders();
    // }, [searchFilter]);

    async function getPrescriptions() {
        let response = await axios.get('http://localhost:3000/api/admin/prescriptions/getall', { headers: headers })
        setPrescriptions(response.data.data)
        // setFilteredOrders(response.data.data)
    }

    // async function getOrdersWithFilter(){
    //     let response = await axios.get('http://localhost:3000/api/admin/orders/getorders', { headers: headers, params: {'filter': filter} })
    //     console.log(response);
    // }

    // function getSearchOrders() {
    //     if (searchFilter === "") {
    //         setFilteredOrders(prescriptions);
    //     } else {
    //         let newArray = prescriptions.filter(function (el) {
    //             return String(el._id).includes(searchFilter) || String(el.address).includes(searchFilter) || String(el.phone_number).includes(searchFilter);
    //         });
    //         setFilteredOrders(newArray);
    //     }
    // }

    return (
        <div className="container">
            <div className="containerFormSection">
                <h4>Upcoming Orders</h4>
                {/* SEARCH */}
                {/* <div>
                    <label>Search</label>
                    <input
                        type="text"
                        value={searchFilter}
                        name="searchFilter"
                        onChange={(e) => {
                            setSearchFilter(e.target.value);
                        }}
                    />
                </div> */}
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
                {prescriptions == null ? <p>LOADING</p>
                    :
                    <ListPrescription
                        dataArray={prescriptions}
                    />}

                {message === "" ? <></> : <h1>{message}</h1>}
            </div>
            <div className="containerPreviewSection">

            </div>
        </div >
    );
}