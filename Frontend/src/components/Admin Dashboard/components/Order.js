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
                <p>USER ID</p>
                <p>{details.user_id}</p>
                <p>STATUS</p>
                <p>{details.details.status}</p>
                <p>DELIVERED</p>
                <p>{details.details.is_delivered ? <>YES</> : <>NO</>}</p>
                <p>CANCELED</p>
                <p>{details.details.is_cancelled ? <>YES</> : <>NO</>}</p>
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