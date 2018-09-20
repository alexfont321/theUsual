import React, { Component } from "react"

export default class AddOrder extends Component {

    state = {
        food: ""

    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    addOrderToRestaurant = e => {
        e.preventDefault();

        const groupId = parseInt(this.props.match.params.restaurant, 0)

        if(this.state.name === "") {
            window.alert("Please fill out the order")

        } else { 
            const newOrder = {
                food: this.state.food,
                userId: this.props.user.id,
                groupRestaurantId: groupId
            }
            this.props.postOrdersInGroupRest("orders", newOrder, groupId).then(() => this.props.history.goBack())
        }
    } 

    render() {

        // const correctRestaurantId = parseInt(this.props.match.params.restaurant, 0)

        return (
            <React.Fragment>
                <section className="hero">
                    <div className="hero-body">
                        <h1 className="title has-text-black">Add Your Order</h1>
                    </div>
                </section>
                <form onSubmit={this.addOrderToRestaurant}>
                <div className="field">

                        {/* <label className="label" htmlFor="food">Food</label> */}
                        <div className="control">

                            <textarea defaultValue=""  id="food" className="textarea is-primary is-rounded"
                                onChange={this.handleFieldChange} placeholder="Place Your Order" ></textarea>
                    </div></div>
                    <div className="field">
                        <button className="button is-rounded is-outlined is-primary">Save Order</button>

                    </div>
                </form>
            </React.Fragment>
        )
    }
}