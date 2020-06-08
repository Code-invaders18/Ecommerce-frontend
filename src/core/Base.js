import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron bg-dark text-black text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead text-center">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer bg-dark mt-auto py-2">
      <div className="container-fluid bg-success tex-white text-center py-2">
        <h5>If you got any questions feel free to reach out!!</h5>
        <button className="btn btn-warning bt-lg">Contact Us</button>
      </div>
      <div className="container">
        <span className="text-muted">
          An amazing <span className="text-white">MERN</span> bootcamp
        </span>
      </div>
    </footer>
  </div>
);
export default Base;
