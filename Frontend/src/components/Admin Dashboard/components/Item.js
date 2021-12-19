export default function Item({data, category, buttonFunction, buttonText}){
    return(
        <div>
            <p>
                {data.name}
            </p>
            <button
                type='button'
                onClick={()=>{
                    buttonFunction(category, data._id)
                }}
            >
                {buttonText}
            </button>
        </div>
    )
}