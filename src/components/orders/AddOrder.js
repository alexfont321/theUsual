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
            this.props.postOrdersInGroupRest("orders", newOrder, groupId ).then(() => this.props.history.goBack())
        }
    } 

    render() {

        // const correctRestaurantId = parseInt(this.props.match.params.restaurant, 0)

        return (
            <React.Fragment>
                <h4>Add Your Order</h4>
                <form onSubmit={this.addOrderToRestaurant}>
                    <fieldset>
                        <label htmlFor="food">Food</label>
                        <input defaultValue=""  id="food"
                                onChange={this.handleFieldChange} />
                    </fieldset>
                    <fieldset>
                        <button>Save Order</button>

                    </fieldset>
                </form>
            </React.Fragment>
        )
    }
}