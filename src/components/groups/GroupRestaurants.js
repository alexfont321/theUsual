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


    render() {
        
        const correctGroupId = parseInt(this.props.match.params.groupId, 0)
        // const correctGroupIdForTitle = parseInt(this.state.match.params.groupId, 0)


        const groupRestId = this.props.groupRestaurants.map(restaurant => restaurant.restaurantId);


        return(
            <React.Fragment>
                <div>
                    <h1>Restaurants Available</h1>
                    {
                        this.props.restaurants.map(restaurant => {
                            if(restaurant.id !== groupRestId.find(id => id === restaurant.id)) { 
                            return <div className="restaurants" key={restaurant.id}>
                                    <p>{restaurant.name}</p>
                                    <button id={restaurant.id} onClick={this.moveRestaurantIntoGroup}>Save Restaurant to Group</button>
                                </div>
                            }

                            }

                        )
                    }
                    <h3>Restaurants for {this.props.groups.find(group => group.id === correctGroupId).name}
                    </h3>
                        {
                            this.props.groupRestaurants.map(restaurant => {
                                return <div className="restaurants" key={restaurant.id}>
                                    <p>{this.props.restaurants.find(rest => rest.id === restaurant.restaurantId).name}</p>
                                    <p>Poop</p>
                                    <button onClick={() => this.props.history.push(`/group/${correctGroupId}/restaurant/${restaurant.id}`)}>See Orders</button>
                                </div>

                            })

                        }

                </div>
            </React.Fragment>
        )
    }
}