import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { getProducts, deleteProduct } from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]); //there will be lot of product that will come here and fill the array

  const { user, token } = isAuthenticated();

  const preload = () =>
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setProducts(data); //in the array we will simply store the data
      }
    });

  // now we have to call the functi
  // on that is need to be called up before the component mount

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    console.log(productId);
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All products:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {products.map((product, index) => (
            <div key={index} className="row text-center mb-2 ">
              <div className="col-4">
                <h3 className="text-white text-left">{product.name}</h3>
              </div>
              <div className="col-4">
                <Link
                  className="btn btn-success"
                  to={`/admin/product/update/${product._id}`}
                >
                  <span className="">Update</span>
                </Link>
              </div>
              <div className="col-4">
                <button
                  onClick={() => {
                    deleteThisProduct(product._id); //if we would have not pass any value
                    //we could have use {delteThisProduct} method..here we r accessing
                    //it by callback function method
                  }}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
