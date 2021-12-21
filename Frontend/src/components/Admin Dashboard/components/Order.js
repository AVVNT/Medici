import { useState } from "react"

export default function Order({ details }) {
    const [show, setShow] = useState(false)

    return (
        <div>
            <button
                onClick={() => {
                    setShow(!show)
                }}
            >
                <p>{details._id}</p>
                <p>{details.address}</p>
                <p>{details.phone_number}</p>
            </button>
            {show ? <div>
                <p>{details.user_id}</p>
                <p>STATUS</p>
                <p>{details.details.status}</p>
                <p>DELIVERED</p>
                <p>{details.details.is_delivered}</p>
                <p>CANCELED</p>
                <p>{details.details.is_cancelled}</p>
                <p>ORDER</p>
                {details.order.map(item => (
                    <div>
                        <p>{item.item}</p>
                        <p>{item.qty}</p>
                    </div>
                ))}
            </div> : <></>}
        </div>
    )
}