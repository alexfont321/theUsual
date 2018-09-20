import React, { Component } from "react";

export default class EditOrder extends Component {

    state = {}


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    componentDidMount() {
        const order = this.props.orders.find(a => a.id === parseInt(this.props.match.params.orderId, 0)) || {}
        this.setState(order)
    }

    editOrder = e => {
        e.preventDefault()
        const updatedEvent = {
            food: this.state.food,
            userId: this.state.userId,
            groupRestaurantId: this.state.groupRestaurantId
        }

       const correctOrderId = parseInt(this.props.match.params.orderId, 0);
       const correctGroupId = parseInt(this.props.match.params.groupId, 0);
       const correctRestaurantId = parseInt(this.props.match.params.restaurant, 0);

       this.props.editOrder("orders", correctOrderId, updatedEvent, correctRestaurantId)
        .then(() => this.props.history.goBack())
    }

    render() {
        return (
            <React.Fragment>
                <section className="hero">
                    <div className="hero-body">
                        <h1 className="title has-text-black">Edit Your Order</h1>
                    </div>
                </section>
                    <form>
                        <div className="field">
                        <div className="control">

                            <input type="textarea" required="true"
                                className="textarea is-primary"
                                onChange={this.handleFieldChange}
                                id="food"
                                // placeholder="Your Order"
                                defaultValue={this.state.food}
                                />
                        </div></div>
                        <div className="field">
                            <button onClick={this.editOrder} className="button is-rounded is-outlined is-primary">Edit Your Order</button>
                        </div>

                    </form>

            </React.Fragment>

        )
    }
}