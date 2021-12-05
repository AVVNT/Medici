import './AddProduct.css';
import React from 'react';
import { ReactDOM } from 'react';

function AddProduct() {
    return (
        <div className="addProductContainer">
            <div className="addProductContainerFormSection">
                <h4>Add Products</h4>
                <form className="primary-font addProductForm">
                    <div className="col-1">
                        <label>Product Name:</label> <br />
                        <input type="text" name="productName" />
                    </div>
                    <div className="col-2">
                        <label>Manufacturer:</label> <br />
                        <input type="text" name="manufacturer" />
                    </div>
                    <div className="col-1">
                        <label>SKU:</label> <br />
                        <input type="text" name="sku" />
                    </div>
                    <div className="col-2">
                        <label>Stock Count</label><br />
                        <input type="number" name="stock-count" />
                    </div>
                    <div className="col-1">
                        <label>Regular Price</label><br />
                        <input type="number" name="regular-price" />
                    </div>
                    <div className="col-2">
                        <label>Discounted Price</label><br />
                        <input type="number" name="discounted-price" />
                    </div>
                    <div>
                        <label>Short Description:</label> <br />
                        <textarea name="short-description" rows="10" cols="50" />
                    </div>
                    <div>
                        <label>Long Description:</label> <br />
                        <textarea name="long-description" rows="10" cols="50" />
                    </div>
                    <div>
                        <label>Select Category</label> <br />
                        <select>
                            <option>Category1</option>
                            <option>Category2</option>
                            <option>Category3</option>
                            <option>Category4</option>
                            <option>Category5</option>
                            <option>Category6</option>
                        </select>
                    </div>
                    <div>
                        <label>Upload Image</label> <br />
                        <input type="image" name="product-image" />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
            </div>
            <div className="addProductContainerPreviewSection">

            </div>
        </div >
    );
}

export default AddProduct;