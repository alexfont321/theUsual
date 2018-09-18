import React, { Component } from "react"

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


        return(
            <React.Fragment>
                <div id="group-restaurants-wrapper">
                    <section className="hero">
                        <div className="hero-body">
                            <h1 className="title has-text-black">Restaurants And Groups</h1>
                        </div>
                    </section>
                    <h1>Restaurants Available</h1>
                    {
                        this.props.restaurants.map(restaurant => {
                            if(restaurant.id !== groupRestId.find(id => id === restaurant.id)) { 
                            return <div className="restaurants" key={restaurant.id}>
                                    <p>{restaurant.name}</p>
                                    <button id={restaurant.id} onClick={this.moveRestaurantIntoGroup}>Save Restaurant to Group</button>
                                </div>
                            } else {
                                return <div key={restaurant.id}>
                                            <p></p>
                                        </div>
                            }

                            }

                        )
                    }
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
            </React.Fragment>
        )
    }
}