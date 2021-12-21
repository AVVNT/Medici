export default function Order({details}){
    return(
        <div>
            <p>{details._id}</p>
            <p>{details.address}</p>
            <p>{details.phone_number}</p>
        </div>
    )
}