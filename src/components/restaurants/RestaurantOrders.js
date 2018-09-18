import React, { Component } from "react";

export default class RestaurantOrder extends Component {


    moveToEdit = e => {
        const correctGroupId = parseInt(this.props.match.params.groupId, 0)
        const correctRestaurantId = parseInt(this.props.match.params.restaurant, 0)
        this.props.history.push(`/group/${correctGroupId}/restaurant/${correctRestaurantId}/edit-order/${e.target.id}`)
    }

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
                            <button
                                onClick={() => this.props.deleteOrder("orders", `${order.id}`, `${correctRestaurantId}`)}
                            >Delete</button>
                            <button id={order.id}
                            onClick={this.moveToEdit}>Edit</button>
                        </div>
                    })
                }

            </React.Fragment>
        )
    }
}