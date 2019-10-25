import React, { useEffect, useState } from 'react';

import rose from '../images/rose.png';
import tulip from '../images/tulip.png';
import lily from '../images/lily.png';
import orchid from '../images/orchid.png';
import peony from '../images/peony.png';

const Homepage = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('https://proj-api.emelieaslund.me/')
        .then(res => res.json())
        .then(res => setMessage(res.data[0].msg));
    });

    return (
        <main>
            <h1>Hummingbird Creations</h1>
        <div className="flowers">
            <img src={rose} alt="Rose" />
            <img src={tulip} alt="Tulip" />
            <img src={lily} alt="Lily" />
            <img src={orchid} alt="Orchid" />
            <img src={peony} alt="Peony" />
        </div>
        <div className="flowerMessage">
            <p>{message}</p>
        </div>

        </main>
    );
};

export default Homepage;
