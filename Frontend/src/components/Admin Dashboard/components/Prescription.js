import axios from "axios";
import { useState, useEffect } from "react"

export default function Prescription({ details }) {
    const [show, setShow] = useState(false)
    let headers = {
        'Content-Type': 'application/json',
        'x-access-token': sessionStorage.getItem('x-token')
    }

    useEffect(() => {
        async function temp() {
            details.medicines.forEach(async element => {
                let response = await checkInStock(element.category, element.id, element.qty)
                element['stock_details'] = response
            });
        }

        temp()
    }, [])

    let daysLeft = (date) => {
        let currentDate = new Date()
        let diff = date - currentDate
        let days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return days
    }

    async function checkInStock(category, id, qty) {
        let body = {
            "category": category,
            "medicine_id": id,
            "qty_required": qty
        }
        let response = await axios.post('http://localhost:3000/api/admin/products/checkstock', body, { headers: headers })
        return response.data.body
    }

    return (
        <div>
            <button
                onClick={() => {
                    setShow(!show)
                    console.log(details)
                }}
            >
                <p>{details._id}</p>
                <p>{details.title}</p>
                <p>DAYS LEFT</p>
                <p>{daysLeft(details.next_date)}</p>
            </button>
            {show ? <div>
                <p>USER ID</p>
                <p>{details.user_id}</p>
                <p>REPEAT</p>
                <p>{details.repeat}</p>
                <p>NEXT DATE</p>
                <p>{details.next_date}</p>
                <p>MEDICINES</p>
                {details.medicines.map(item => (
                    <div>
                        <p>{item.category}</p>
                        <p>{item.id}</p>
                        <p>{item.qty}</p>
                        <p>STOCK DETAILS</p>
                        {item.stock_details?.is_in_stock ? <p>IS IN STOCK</p> : <p>INSUFFICIENT STOCK, ORDER MORE {Math.abs(item.stock_details?.stock_left)}</p>}
                    </div>
                ))}
            </div> : <></>}
        </div>
    )
}