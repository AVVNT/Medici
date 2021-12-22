import { useState } from "react"

export default function Prescription({ details }) {
    const [show, setShow] = useState(false)

    let daysLeft = (date) => {
        let currentDate = new Date()
        let diff = date - currentDate
        console.log(diff);
        let days = Math.ceil(diff/(1000 * 60 * 60 * 24))
        return days
    }

    return (
        <div>
            <button
                onClick={() => {
                    setShow(!show)
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
                        <p>{item.id}</p>
                        <p>{item.qty}</p>
                    </div>
                ))}
            </div> : <></>}
        </div>
    )
}