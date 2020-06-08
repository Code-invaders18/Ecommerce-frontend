import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import {
  getCategories,
  updateCategory,
  getCategory,
} from "./helper/adminapicall";

const UpdateCategory = ({ match }) => {
  const { token, user } = isAuthenticated();
  const [value, setValue] = useState({ name: "", error: "" });
  const { name, error } = value;

  const preload = (
    categoryId //this is working properly
  ) =>
    getCategory(categoryId).then((data) => {
      if (data.error) {
        setValue({ ...value, error: data.error });
      } else {
        setValue({ ...value, name: data.name });
      }
    });
  useEffect(() => {
    //this is working properly
    preload(match.params.categoryId);
  }, []);

  const handleChange = (event) => {
    setValue({ name: event.target.value });
    console.log(name);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValue({ ...value, error: "" });
    updateCategory(match.params.categoryId, user._id, token, name).then(
      (data) => {
        setValue({ name: "", error: "" });
      }
    );
  };
  const updateForm = () => (
    <div>
      <h3 className="col-md-4 offset-md-4 text-white text-centre">
        Update your search here!!
      </h3>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          placeholder="Name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div class="input-group-append">
          <button
            onClick={onSubmit}
            className="btn btn-outline-secondary"
            type="button"
          >
            Button
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Base
      title="Add a product here!"
      description="Welcome to product creation section"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
        Admin Home
      </Link>
      {updateForm()}
    </Base>
  );
};
export default UpdateCategory;
