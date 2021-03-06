import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div className="lg:px-12">
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-dropdown"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col ">
          {/* <!-- Page content here --> */}
          <h2 className="text-3xl font-bold text-purple-700 text-center my-10">
            Welcome To Dashboard
          </h2>
          <Outlet />
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-dropdown"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 overflow-y-auto w-50 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <NavLink to="/dashboard">My Appointment</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/review">My Review</NavLink>
            </li>
            {admin && (
              <>
                <li>
                  <NavLink to="/dashboard/user">All User</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/addDoctor">Add Doctor</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageDoctor">Add Doctor</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
