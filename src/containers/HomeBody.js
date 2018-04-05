import React, { Component } from 'react';

class HomeBody extends Component {
    render() {
        return (
            <div className="container">
                <div className="home-body-area col">
                    <h2 className="algn-center">Lorem ipsum dolor sit amet,</h2>
                    <p className="algn-center">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </p>
                    <div className="missions-area">
                        <div className="row align-items-center mission-row">
                            <div className="col-6 algn-center">
                                <h3>Mission</h3>
                            </div>
                            <div className="col-6">
                                <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                </p>
                            </div>
                        </div>
                        <div className="row align-items-center mission-row">
                            <div className="col-6 right-algn">
                                <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                </p>
                            </div>
                            <div className="col-6 algn-center">
                                <h3>Vision</h3>
                            </div>
                        </div>
                        <div className="row align-items-center mission-row">
                            <div className="col-6 algn-center">
                                <h3>Target</h3>
                            </div>
                            <div className="col-6">
                                <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, 
                                eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default HomeBody;