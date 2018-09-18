import React, { Component } from "react";
import { Route } from 'react-router-dom';
import GroupsList from "./groups/GroupsList";
import dbCalls from "../modules/DatabaseCalls";
import CreateGroupForm from "./groups/CreateGroupForm";
import GroupRestaurants from "./groups/GroupRestaurants"
import RestaurantOrder from "./restaurants/RestaurantOrders"
import AddOrder from "./orders/AddOrder"
import EditOrder from "./orders/EditOrder"
import "bulma/css/bulma.css"

export default class MainPage extends Component {

    state = {
        user: [],
        groups: [],
        restaurants: [],
        orders: [],
        userGroups: [],
        groupRestaurants: []
    }

    componentDidMount() {
        let newState = {}
        newState.user = JSON.parse(sessionStorage.getItem("user")) || {};
        dbCalls.getAll("groups").then(groups => {newState.groups = groups})
            .then(() => dbCalls.getAll("restaurants")).then(restaurants => {newState.restaurants = restaurants})
            // .then(() => dbCalls.getAll("orders")).then(orders => {newState.orders = orders})
            // .then(() => dbCalls.getAll("groupRestaurants")).then(restaurants => {newState.groupRestaurants = restaurants})
            .then(() => dbCalls.getDataByUserId(newState.user.id, "userGroups")).then(userGroups => {newState.userGroups = userGroups})
            .then(() => {
                this.setState(newState)
        })
    }

    getDatafromGroupList = (theData) => {
        dbCalls.getRestaurantbyGroupId(theData, "groupRestaurants")
        .then(restaurants => {
            this.setState({groupRestaurants: restaurants})
        })

    }

    getDatafromGroupRestList = (order) => {
        dbCalls.getOrdersbyGroupAndRestaurant(order, "orders")
        .then(orders => {
            this.setState({orders: orders})
        })
    }

    post = (resource, newObject) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getAll(resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }

    postUserGroup = (resource, newObject) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getDataByUserId(this.state.user.id, resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }
    postGroupRestaurant = (resource, newObject, groupId) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getRestaurantbyGroupId(groupId, resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }

    postOrdersInGroupRest = (resource, newObject, groupId) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getOrdersbyGroupAndRestaurant(groupId, resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }
    
    deleteOrder = (resource, orderId, groupId) => {dbCalls.delete(resource, orderId)
        .then(() => dbCalls.getOrdersbyGroupAndRestaurant(groupId, resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }

    editOrder = (resource, orderId, newObject, groupRestId) => dbCalls.patch(resource, newObject, orderId)
        .then(() => dbCalls.getOrdersbyGroupAndRestaurant(groupRestId, resource))
        .then(returnObject => this.setState({[resource]: returnObject}))




    render() {
        return (
            <React.Fragment>
                <Route path="/groups" render={props => {
                    return < GroupsList {...props} 
                    groups={this.state.groups} postUserGroup={this.postUserGroup}
                    user={this.state.user} userGroups={this.state.userGroups}
                    getDatafromGroupList={this.getDatafromGroupList} />
                }} />


                <Route path="/creategroup" render={props => {
                    return < CreateGroupForm {...props} post={this.post}/>
                }} />



                <Route exact path="/group/:groupId(\d+)" render={props => {
                    return < GroupRestaurants {...props} restaurants={this.state.restaurants}
                    postGroupRestaurant={this.postGroupRestaurant} groupRestaurants={this.state.groupRestaurants}
                    groups={this.state.groups} getDatafromGroupRestList={this.getDatafromGroupRestList}/>
                }}/>



                <Route exact path="/group/:groupId(\d+)/restaurant/:restaurant(\d+)" render={props => {
                    return < RestaurantOrder {...props}  restaurants={this.state.restaurants}
                    groups={this.state.groups} orders={this.state.orders} user={this.state.user}
                    deleteOrder={this.deleteOrder}/>
                }} />


                <Route exact path="/group/:groupId(\d+)/restaurant/:restaurant(\d+)/add-order" render={props => {
                    return < AddOrder {...props} restaurants={this.state.restaurants} user={this.state.user}
                    post={this.post} postOrdersInGroupRest={this.postOrdersInGroupRest}/>
                }} />

                <Route exact path="/group/:groupId(\d+)/restaurant/:restaurant(\d+)/edit-order/:orderId(\d+)"
                    render={props => < EditOrder {...props} orders={this.state.orders}
                    editOrder={this.editOrder} restaurants={this.state.restaurants}/>
                } />
            </React.Fragment>
        )
    }
}