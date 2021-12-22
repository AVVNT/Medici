import './singleproduct.css';
import productImage from '../../Assets/CaC-100.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SingleProduct({ id }) {
    const [details, setDetails] = useState(null)

    useEffect(() => {
        async function fetchAPI() {
            await getProduct()
        }

        fetchAPI()
    }, [])

    async function getProduct() {
        let response = await axios.get('http://localhost:3000/api/listing/product/medicine/' + id)
        console.log(response)
        setDetails(response.data.body)
    }

    return (
        <div className='body'>
            {details == null ? <p>LOADING</p> : <>
                <div className='breadcrumbs'>
                    <span className='breadcrumb__item primary-font'>Home</span>
                    <span className='breadcrumb__item '>
                        <svg aria-hidden="true" className='breadcrumbs__icon-greaterthan' focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 8 5">
                            <path fill="currentColor" fillRule="evenodd" d="M1.002.27L.29.982l3.712 3.712L7.714.982 7.002.27l-3 3z"></path>
                        </svg>
                    </span>
                    <span className='breadcrumb__item primary-font'>Products</span>
                    <span className='breadcrumb__item'>
                        <svg aria-hidden="true" className='breadcrumbs__icon-greaterthan' focusable="false" role="presentation" xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 8 5">
                            <path fill="currentColor" fillRule="evenodd" d="M1.002.27L.29.982l3.712 3.712L7.714.982 7.002.27l-3 3z"></path>
                        </svg>
                    </span>
                    <span className='breadcrumb__item primary-font'>Single Product</span>
                </div>
                <div className='productdetailscontainer'>
                    <div className='productdetailscontainer__image'>
                        <img className='productdetailscontainer__image-product' src={productImage} width={400} height={400} />
                    </div>
                    <div className='productdetailscontainer__information'>
                        <h2 className='productdetailscontainer__information-productname'>
                            {details.name}
                        </h2>
                        <h4 className='productdetailscontainer__information-productcompany'>
                            {details.manufacturer}
                        </h4>
                        <h4 className='productdetailscontainer__information-productprice'>
                            {details.price}
                        </h4>
                        <p className='productdetailscontainer__information-productshortdescription'>
                            {details.short_description}
                        </p>
                        <div className='productdetailscontainer__information-calltoactioncontainer'>
                            <button className='productdetailscontainer__information-productaddtocard'>
                                Add to Cart
                            </button>
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="productlongdetailscontainer">
                    <div className="productlongdetailssubcontainer">
                        {details.long_description}
                        <hr />
                    </div>
                </div>
                <div className="productsummarycontainer">
                    <div className="productsummarysubcontainer">

                    </div>
                </div>
            </>}

        </div >
    );
}