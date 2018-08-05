import React from 'react';
import Login from "../components/auth/Login";
import { Link } from 'react-router-dom';

const LoginPage = (props) => {
  return (
      <div className="bg">
        <div className="container auth-page">
            <div className="row justify-content-center" >
                <div className="col-xs-12 col-lg-6 align-self-center">
                    <Login />
                    <p className="have-account">If You Don't have an Account!<Link to="/signup" > Sign Up</Link></p>
                </div>
            </div>
        </div>
      </div>
  );
};

export default LoginPage;