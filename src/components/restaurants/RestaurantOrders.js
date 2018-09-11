import React, { Component } from "react";

export default class RestaurantOrder extends Component {


    render() {
        return (
            <React.Fragment>
                <h1>Orders</h1>
                {
                    this.props.orders.map(order => {
                        return <div className="orders" key={order.id}> 
                                    <p>{order.food}</p>
                                    <p>{order.drink}</p>
                                </div>
                    })
                }
                
            </React.Fragment>
        )
    }
}