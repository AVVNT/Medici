export default function Item({data, category, buttonFunction, buttonText, setItem}){
    return(
        <div>
            <p>
                {data.name}
            </p>
            <button
                type='button'
                onClick={()=>{
                    if(buttonFunction){
                        buttonFunction(category, data._id)
                    } 
                    if(setItem){
                        setItem(data)
                    }
                }}
            >
                {buttonText}
            </button>
        </div>
    )
}