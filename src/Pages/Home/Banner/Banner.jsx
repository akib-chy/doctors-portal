import React from "react";
import { Link } from "react-router-dom";
import Chair from "../../../assets/images/chair.png";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="hero py-12 lg:px-12">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="lg:mx-28">
            <img
              src={Chair}
              className="max-w-sm w-full lg:w-96 rounded-lg shadow-2xl"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-3xl lg:text-5xl  font-bold">
              Your New Smile Starts Here
            </h1>
            <p className="py-6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the
            </p>
            <Link
              to="/appointment"
              className="btn btn-primary text-white font-bold bg-gradient-to-r from-secondary to-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
