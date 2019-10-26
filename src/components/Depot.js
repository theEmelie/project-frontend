import React, { Component } from 'react';
import io from 'socket.io-client';

import '../styles/tables.css';

class Depot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            balance: 0,
            username: "",
            objectExist: false,
            sellNumber: []
        };

        let token = sessionStorage.getItem('jwtToken');

        // If user is not logged in when trying to access depot, redirect to login page
        if (token == null) {
            window.location.href="/login";
        }

        this.getObjects();

        this.fundsChange = this.fundsChange.bind(this);
        this.sellChange = this.sellChange.bind(this);
    }

    componentWillUnmount() {
        this.socket.close();
    }

    componentDidMount() {
        this.socket = io("https://proj-api.emelieaslund.me");

        this.socket.on('newPrices', (items) => {
            let objects = [...this.state.objects];

            if (objects[0].object_rowid != null)  {
                objects.forEach(function(item) {
                    item.current_price = items[item.object_rowid-1].current_price;
                });
                this.setState({
                    objects: objects
                });
            }
        });
    }


    fundsChange(e) {
        let funds = e.target.value;

        this.setState({
            funds: funds
        });
    }

    getObjects() {
        const url = `https://proj-api.emelieaslund.me/depots/view-depot`;

        fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'x-access-token':
            sessionStorage.getItem('jwtToken')}
        })
            .then(res => res.json())
            .then(response => this.saveObjectData(response));
    }

    saveObjectData(response) {
        // console.log(response);
        let balance = response.data[0].balance;
        let username = response.data[0].username;
        let objectExist = response.data[0].object_rowid ? true : false;

        this.setState({
            balance: balance,
            username: username,
            objectExist: objectExist,
            objects: response.data,
            funds: 0,
            sellNumber: []
        });
        // console.log(this.state);
    }

    handleAddFunds() {
        const url = "https://proj-api.emelieaslund.me/depots/add-funds";

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                funds: this.state.funds,
            }),
            headers: {'Content-Type': 'application/json',
                'x-access-token': sessionStorage.getItem('jwtToken')}
        })
            .then(res => res.json())
            .then(response => this.handleAddFundsResponse(response));
    }

    handleAddFundsResponse(response) {
        this.setState({
            balance: response.data.new_balance
        });
    }

    sellChange(rowid, e) {
        let sellNums = [...this.state.sellNumber];

        sellNums[rowid] = e.target.value;
        this.setState({
            sellNumber: sellNums
        });
        // }, () => {console.log(this.state.sellNumber);});
    }

    sellButtonClicked(rowid) {
        if (this.state.sellNumber[rowid] > 0) {
            const url = "https://proj-api.emelieaslund.me/objects/sell-object";

            // console.log(this.state.funds);
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    rowid: rowid,
                    number_to_sell: this.state.sellNumber[rowid]
                }),
                headers: {'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem('jwtToken')}
            })
                .then(res => res.json())
                .then(response => this.handleSellResponse(response));
        } else {
            console.log("Must sell atleast one");
        }
    }

    handleSellResponse(response) {
        if (Object.prototype.hasOwnProperty.call(response, "data")) {
            this.getObjects();
            this.setState({
                sellNumber: []
            });
            alert("Du har sålt " + response.data.number_to_sell + "st " +
                response.data.objname + " för " + response.data.sale_funds);
        } else {
            alert("Du har inte tillräckligt antal!");
        }
    }

    render() {
        var objectTable;

        if (this.state.objectExist) {
            const objects = this.state.objects.map(function(item, index) {
                if (item.number_of_objects > 0) {
                    return <tr key={index}>
                        <td>{item.objname}</td>
                        <td>{item.number_of_objects}</td>
                        <td>{item.current_price}</td>
                        <td className="objButton">
                        <input name="sellInput" className="sellInput"
                            placeholder="Ange mängd du vill sälja"
                            type="number"
                            onChange={this.sellChange.bind(this, item.object_rowid)} />
                        <button className="viewButton"
                        onClick={this.sellButtonClicked.bind(this, item.object_rowid)}>Sälj
                            </button></td>
                    </tr>;
                } else {
                    return  <tr key={index}></tr>;
                }
            }, this);

            objectTable = objects;
        } else {
            objectTable = <tr></tr>;
        }

        return (
            <div className="getObjects">
            <h2>{this.state.username}&apos;s Depå</h2>
                <div className="balance">
                    <p>Tillgängligt medel: {Math.round(100*(this.state.balance))/100}</p>
                    <input name="balanceInput" className="balanceInput"
                        type="number" onChange={this.fundsChange.bind(this)} />
                    <button className="addFundsButton"
                        onClick={this.handleAddFunds.bind(this)}>Lägg till medel</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Blomma</th>
                            <th>Antal ägda</th>
                            <th>Värde</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{objectTable}</tbody>
                </table>
            </div>
        );
    }
}

export default Depot;
