import './singleproduct.css';
import productImage from '../../Assets/CaC-100.jpg';

function singleproduct() {
    return (
        <div className='body'>
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
                        Cac1000 Plus Tab-Orange T 20's
                    </h2>
                    <h4 className='productdetailscontainer__information-productcompany'>
                        by GSK Consumer Healthcare
                    </h4>
                    <h4 className='productdetailscontainer__information-productprice'>
                        Rs. 373.90
                    </h4>
                    <p className='productdetailscontainer__information-productshortdescription'>
                        Rs. 18.70 per Tablet
                        20 Tablets per pack
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
        </div>
    );
}

export default singleproduct;