import Item from "./Item"

export default function ListItems({dataArray, category, buttonFunction, buttonText, setItem}){
    return(
        <div>
            {dataArray.map(item => (
                <Item 
                    key={item._id}
                    data={item}
                    category={category}
                    buttonFunction={buttonFunction}
                    buttonText={buttonText}
                    setItem={setItem}
                />
            ))}
        </div>
    )
}