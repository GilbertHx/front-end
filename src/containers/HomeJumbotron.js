import React from 'react';
import AuthTabs from "../components/auth/AuthTabs"
import './Containers.css';

const HomeJumbotron = (props) => {
  return (
      <div>
        <div className="jumbotron">
          <div className="container" >
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="jumbo-text" >
                  <h1 className="display-3">Hello, world!</h1>
                  <p className="lead">This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
                  <hr className="my-2" />
                  <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
                </div>
              </div>
              <div className="col-md-6">
                <AuthTabs />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default HomeJumbotron;