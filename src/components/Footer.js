import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
    render() {
        return (
            <div className="footer-bg">
                {/* <div className="container">
                   <div className="row">
                        <div className="col-12">
                            <p className="footer-logo" >
                                TryE-Learning
                            </p>
                        </div>
                   </div>
                </div> */}
                <div className="sub-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6 align-self-center">
                                <ul>
                                    <li>
                                        <Link to="/units">Units</Link>
                                    </li>
                                    <li>
                                        <Link to="/exam">Exam</Link>
                                    </li>
                                    <li>
                                        <Link to="/admin/dashboard">Admin</Link>
                                    </li>
                                    <li>
                                        <Link to="/login">Login</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="col-md-6 align-self-center text-right">
                                <p className="copyright" >
                                    © 2018 Copyright REB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;