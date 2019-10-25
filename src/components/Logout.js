import React, { Component } from 'react';

class Logout extends Component {
    constructor(props) {
        super(props);
        sessionStorage.clear();
        window.location.href="/";
    }
    render() {
        return (
            <div className="logout"></div>
        );
    }
}

export default Logout;
