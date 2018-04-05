import React from 'react';
import Signup from "../components/auth/Signup";

const SignupPage = (props) => {
  return (
    <div className="bg">
      <div className="container auth-page">
        <div className="row justify-content-center" >
            <div className="col-xs-12 col-lg-6 align-self-center">
              <Signup />
              <p className="have-account">Already have a account? <a href="/login" >Login</a></p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;