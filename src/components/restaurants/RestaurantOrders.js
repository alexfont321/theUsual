import React, { Component } from "react";
// import dbCalls from "../../modules/DatabaseCalls";

export default class RestaurantOrder extends Component {

    // state = {
    //     users: []
    // }

    // componentDidMount() {
    //     let newState = {}

    //     dbCalls.getAll("users").then(users => {newState.users = users})
    //     .then(() => {
    //         this.setState(newState)
    // })
    // }


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
                <section className="hero">
                    <div className="hero-body">
                        <h1 className="title has-text-black">Orders</h1>
                    </div>
                </section>
                <div className="columns">
                    <div className="column is-1"></div>
                        <div className="column is-2">
                    <button className="button is-rounded is-primary is-outlined"
                        onClick={() => this.props.history.push(`/group/${correctGroupId}/restaurant/${correctRestaurantId}/add-order`)}>Add an Order</button>
                    </div>
                    <div className="column">
                        <section className="columns is-multiline">
                            {
                                this.props.orders.map(order => {
                                    return <div className="column is-one-quarter" key={order.id}>
                                            <div className="card">
                                                <div className="card-header is-centered">
                                                    <p className="is-centered card-header-title">{this.props.users.find(user => user.id === order.userId).firstName}</p>
                                                </div>
                                                <div className="card-content">
                                                     <p>{order.food}</p>
                                                </div>
                                                <div className="card-footer">
                                
                                        <button id={order.id} className="card-footer-item button is-paddingless is-inverted is-info"
                                            onClick={this.moveToEdit}>Edit</button>
                                            <button className="card-footer-item button is-paddingless is-inverted is-danger"
                                                     onClick={() => this.props.deleteOrder("orders", `${order.id}`, `${correctRestaurantId}`)}>Delete</button>
                                            </div>
                                    </div>
                                </div>
                                })
                            }
                        </section>
                    </div>

                    <div className="column is-1"></div>

                </div>
            </React.Fragment>
        )
    }
}