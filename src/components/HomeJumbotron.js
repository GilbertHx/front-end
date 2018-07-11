import React from 'react';
import AuthTabs from "../components/auth/AuthTabs"
import '../containers/Containers.css';
import { connect } from 'react-redux';

const HomeJumbotron = (props) => {
  
  return (
      <div>
        <div className="jumbotron">
          <div className="container" >
            {
              !props.authenticated ?
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="jumbo-text" >
                    <h1 className="display-6 first-intro">Online CPD Program for teacher on implementation of Competence Base Curriculum</h1>
                    <p className="lead">Teachers are the most important actors in implementing the new curriculum. Therefore it is
                      essential that teachers are well prepared and supported throughout implementation of the new
                      curriculum.</p>
                    <hr className="my-2" />
                    <p>This online course have been designed to support all teachers from Pre-primary to Secondary School.</p>
                  </div>
                </div>
              <div className="col-md-6">
                <AuthTabs />
              </div> 
              </div> :
              <div className="col-md-8 offset-md-1">
                <div className="jumbo-text" >
                  <h1 className="display-6">Online CPD Program for teacher on implementation of Competence Base Curriculum</h1>
                  <p className="lead">Teachers are the most important actors in implementing the new curriculum. Therefore it is
                    essential that teachers are well prepared and supported throughout implementation of the new
                    curriculum.</p>
                  <hr className="my-2" />
                  <p>This online course have been designed to support all teachers from Pre-primary to Secondary School.</p>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
  );
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(HomeJumbotron);