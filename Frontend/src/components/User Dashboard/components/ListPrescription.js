import Prescription from "./Prescription"

export default function ListPrescription({dataArray}){
    return(
        <div>
            {dataArray.map(item => (
                <Prescription 
                    key={item._id}
                    details={item}
                />
            ))}
        </div>
    )
}