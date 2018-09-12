import React, { Component } from "react";
import { Route } from 'react-router-dom';
import GroupsList from "./groups/GroupsList";
import dbCalls from "../modules/DatabaseCalls";
import CreateGroupForm from "./groups/CreateGroupForm";
import GroupRestaurants from "./groups/GroupRestaurants"
import RestaurantOrder from "./restaurants/RestaurantOrders"
import AddOrder from "./orders/AddOrder"
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
        .then(() => dbCalls.getAll("orders")).then(orders => {newState.orders = orders})
        .then(() => dbCalls.getDataByUserId(newState.user.id, "userGroups")).then(userGroups => {newState.userGroups = userGroups})
        .then(() => {
            this.setState(newState)
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



    render() {
        return (
            <React.Fragment>
                <Route path="/groups" render={props => {
                    return < GroupsList {...props} 
                    groups={this.state.groups} postUserGroup={this.postUserGroup}
                    user={this.state.user} userGroups={this.state.userGroups}/>
                }} />
                <Route path="/creategroup" render={props => {
                    return < CreateGroupForm {...props} post={this.post}/>
                }} />
                <Route exact path="/group/:groupId(\d+)" render={props => {
                    return < GroupRestaurants {...props} restaurants={this.state.restaurants}
                    postGroupRestaurant={this.postGroupRestaurant}/>
                }}/>
                <Route exact path="/group/:groupId(\d+)/restaurant/:restaurant(\d+)" render={props => {
                    return < RestaurantOrder {...props}  restaurants={this.state.restaurants}
                    groups={this.state.groups} orders={this.state.orders}/>
                }} />
                <Route exact path="/group/:groupId(\d+)/restaurant/:restaurant(\d+)/add-order" render={props => {
                    return < AddOrder {...props} restaurants={this.state.restaurants} 
                    post={this.post}/>
                }} />
            </React.Fragment>
        )
    }
}