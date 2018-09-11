import React, { Component } from "react";

export default class RestaurantOrder extends Component {



    render() {

        const correctGroupId = parseInt(this.props.match.params.groupId, 0)
        const correctRestaurantId = parseInt(this.props.match.params.restaurant, 0)

        return (
            <React.Fragment>
                <h1>Orders</h1>
                <button onClick={() => this.props.history.push(`/group/${correctGroupId}/restaurant/${correctRestaurantId}/add-order`)}>Add an Order</button>
                {
                    this.props.orders.map(order => {
                        return <div className="orders" key={order.id}> 
                                    <p>{order.food}</p>
                                </div>
                    })
                }
                
            </React.Fragment>
        )
    }
}