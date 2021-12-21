import Order from "./Order"

export default function ListOrders({dataArray}){
    return(
        <div>
            {dataArray.map(item => (
                <Order 
                    key={item._id}
                    details={item}
                />
            ))}
        </div>
    )
}