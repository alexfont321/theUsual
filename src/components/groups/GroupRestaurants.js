import React, { Component } from "react"
// import "@fortawesome/fontawesome-free/css/fontawesome.min.css"

export default class GroupRestaurants extends Component {



    moveRestaurantIntoGroup = e => {
        e.preventDefault();

        const correctGroupId = parseInt(this.props.match.params.groupId, 0)


        const newGroupRest = {
            groupId: correctGroupId,
            restaurantId: parseInt(e.target.id, 0)
        }

        this.props.postGroupRestaurant("groupRestaurants", newGroupRest, correctGroupId)

    }

    saveOrdersInGroupRestaurant = e => {
        e.preventDefault();

        const correctGroupId = parseInt(this.props.match.params.groupId, 0)


        this.props.getDatafromGroupRestList(e.target.id)

        this.props.history.push(`/group/${correctGroupId}/restaurant/${e.target.id}`)
    }

    render() {

        const correctGroupId = parseInt(this.props.match.params.groupId, 0)
        // const correctGroupIdForTitle = parseInt(this.state.match.params.groupId, 0)


        const groupRestId = this.props.groupRestaurants.map(restaurant => restaurant.restaurantId);


        return (
            <React.Fragment>
                <div id="group-restaurants-wrapper">
                    <section className="hero">
                        <div className="hero-body">
                            <h1 className="title has-text-black">Restaurants And Groups</h1>
                        </div>
                    </section>
                    <div className="columns">
                        <div className="column is-1"></div>
                        <div className="column is-one-quarter">
                            <nav className="panel">
                                <h1 className="panel-heading">Restaurants Available</h1>
                                {
                                    this.props.restaurants.map(restaurant => {
                                        if (restaurant.id !== groupRestId.find(id => id === restaurant.id)) {
                                            return <div className="panel-block" key={restaurant.id}>
                                                <p className="control">{restaurant.name}</p>
                                                <button className="button is-primary is-rounded is-medium"
                                                    id={restaurant.id} onClick={this.moveRestaurantIntoGroup}>
                                                    <span id={restaurant.id} className="icon">
                                                        <i id={restaurant.id} className="fas fa-check"></i>
                                                    </span></button>
                                            </div>
                                        } else {
                                            return <div key={restaurant.id}>
                                                <p></p>
                                            </div>
                                        }

                                    }

                                    )
                                }
                            </nav>
                        </div>
                        <div className="column">
                            <h3>Restaurants for {this.props.groups.find(group => group.id === correctGroupId).name || {}}
                            </h3>
                            {
                                this.props.groupRestaurants.map(restaurant => {
                                    return <div className="restaurants" key={restaurant.id}>
                                        <p>{this.props.restaurants.find(rest => rest.id === restaurant.restaurantId).name}</p>
                                        <button id={restaurant.id} onClick={this.saveOrdersInGroupRestaurant}>See Orders</button>
                                    </div>

                                })

                            }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}