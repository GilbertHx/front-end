import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class NavBAr extends React.Component {
  
  renderLinks() {
    if (this.props.authenticated) {
      return[
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/exam">Exam</Link>
        </li>,
        // <li className="nav-item" key={2}>
        //   <Link className="nav-link" to="/profile">Profile</Link>
        // </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/logout">Logout</Link>
        </li>
      ]
    } else {
      return [
      <li className="nav-item" key={1}>
        <Link className="nav-link" to="/login">Login</Link>
      </li>
      ]
    }
  }

  render() {
    return (
      <div className="nav-bar-cmpnt" >
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light main-navbar">
            <Link className="navbar-brand" to="/">REG</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/units">Units</Link>
                </li>
                {this.renderLinks()}
              </div>
            </div>
          </nav>
        </div>
      </div>
      
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(NavBAr);