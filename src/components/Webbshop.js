import React, { Component } from 'react';

import { Line } from 'react-chartjs-2';

import io from 'socket.io-client';
import '../styles/tables.css';

var graphData = {};
var xVal = 0;

class Webbshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            objects: [],
            buyNumber: [],
            shouldRedraw: false
        };
        let token = sessionStorage.getItem('jwtToken');

        // If user is not logged in when trying to access webbshop, redirect to login page
        if (token == null) {
            window.location.href="/login";
        }

        this.getObjects();
        this.buyChange = this.buyChange.bind(this);
    }

    componentWillUnmount() {
        this.socket.close();
        xVal = 0;
    }

    componentDidMount() {
        const maxValues = 30;

        this.socket = io("https://proj-api.emelieaslund.me");

        this.socket.on('newPrices', (items) => {
            this.setState({
                objects: items
            });

            graphData.labels.push(xVal.toString());
            if (graphData.labels.length > maxValues) {
                graphData.labels.shift();
            }

            items.forEach(function(item) {
                graphData.datasets[item.rowid-1].data.push(item.current_price);
                if (graphData.datasets[item.rowid-1].data.length > maxValues) {
                    graphData.datasets[item.rowid-1].data.shift();
                }
            }, this);
            xVal++;
            this.setState({
                shouldRedraw: true
            });
        });
    }

    getObjects() {
        const url = `https://proj-api.emelieaslund.me/objects/view-objects`;

        fetch(url, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'x-access-token':
            sessionStorage.getItem('jwtToken')}
        })
            .then(res => res.json())
            .then(response => this.saveObjectData(response));
    }

    buyChange(rowid, e) {
        let buyNums = [...this.state.buyNumber];

        buyNums[rowid] = e.target.value;
        this.setState({
            buyNumber: buyNums
        });
        // }, () => {console.log(this.state.buyNumber);});
    }

    buyButtonClicked(rowid) {
        if (this.state.buyNumber[rowid] > 0) {
            const url = "https://proj-api.emelieaslund.me/objects/buy-object";

            // console.log(this.state.funds);
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    rowid: rowid,
                    number_to_buy: this.state.buyNumber[rowid]
                }),
                headers: {'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem('jwtToken')}
            })
                .then(res => res.json())
                .then(response => this.handleBuyResponse(response));
        } else {
            alert("Du måste minst köpa en.");
        }
    }

    handleBuyResponse(response) {
        if (Object.prototype.hasOwnProperty.call(response, "data")) {
            alert("Du har köpt " + response.data.number_to_buy + "st " +
                response.data.name + ". Vilket har kostat dig " +
                response.data.purchase_price);
        } else {
            alert ("Du har inte tillräckligt med medel.");
        }
    }

    saveObjectData(response) {
        var datasets = [];
        var colours = ["#9B4FE6", "#F35DEE", "#660033", "#6666FF", "#DC1493"];

        this.setState({
            objects: response.data
        });
        response.data.forEach(function (object) {
            var dataset = {
                events: [],
                label: object.name,
                fill: false,
                lineTension: 0.1,
                backgroundColor: colours[object.rowid-1],
                borderColor: colours[object.rowid-1],
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: colours[object.rowid-1],
                pointBackgroundColor: '#fff',
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: colours[object.rowid-1],
                pointHoverBorderColor: colours[object.rowid-1],
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: [object.current_price, object.current_price]
            };

            datasets.push(dataset);
        });
        graphData =
        {
            labels: ['-2', '-1'],
            datasets: datasets
        };
    }


    render() {
        const animOff = {animation: false};
        const objects = this.state.objects.map(function(item) {
            return <tr key={item.rowid}>
                <td className="obj">{item.name}</td>
                <td className="obj">{item.current_price}</td>
                <td className="objButton">
                <input name="buyInput" className="buyInput" placeholder="Ange mängd du vill köpa"
                    type="number" onChange={this.buyChange.bind(this, item.rowid)} />
                <button className="viewButton"
                    onClick={this.buyButtonClicked.bind(this, item.rowid)}>Köp</button>
                </td>
            </tr>;
        }, this);

        return (
            <div className="getObjects">
            <h2>Våra Blommor</h2>
                <table>
                <thead>
                    <tr>
                        <th>Blomma</th>
                        <th>Pris</th>
                        <th>Action</th>
                    </tr>
                </thead>
                    <tbody>{objects}</tbody>
                </table>
                <div className="priceChart">
                    <h2>Prisförändringar på blommorna</h2>
                    <Line data={graphData} redraw={this.state.shouldRedraw} options={animOff} />
                </div>
            </div>
        );
    }
}

export default Webbshop;
