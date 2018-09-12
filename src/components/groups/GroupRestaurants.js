import React, { Component } from "react"

export default class GroupRestaurants extends Component {



    render() {
        
        const correctGroupId = parseInt(this.props.match.params.groupId, 0)



        return(
            <React.Fragment>
                <div>
                    <h1>Restaurants Available</h1>
                    {
                        this.props.restaurants.map(restaurant => {
                            return <div className="restaurants" key={restaurant.id}>
                                    <p>{restaurant.name}</p>
                                    <button onClick={() => this.props.history.push(`/group/${correctGroupId}/restaurant/${restaurant.id}`)}>Save Restaurant to Group</button>
                                </div>

                            }

                        )
                    }
                    <h3>This Group's Restaurants</h3>
                        {
                            

                        }

                </div>
            </React.Fragment>
        )
    }
}