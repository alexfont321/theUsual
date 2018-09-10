import React, { Component } from "react";
import { Route } from 'react-router-dom';
import GroupsList from "./groups/GroupsList";
import dbCalls from "../modules/DatabaseCalls";
import CreateGroupForm from "./groups/CreateGroupForm";
import GroupRestaurants from "./groups/GroupRestaurants"

export default class MainPage extends Component {

    state = {
        groups: []
    }

    componentDidMount() {
        let newState = {}
        dbCalls.getAll("groups").then(groups => {newState.groups = groups})
        .then(() => {
            this.setState(newState)

    })}

    post = (resource, newObject) => {return dbCalls.post(resource, newObject)
        .then(() => dbCalls.getAll(resource))
        .then(returnObject => this.setState({[resource]: returnObject}))
    }

    render() {
        return (
            <React.Fragment>
                <Route path="/groups" render={props => {
                    return < GroupsList {...props} 
                    groups={this.state.groups} />
                }} />
                <Route path="/creategroup" render={props => {
                    return < CreateGroupForm {...props} post={this.post}/>
                }} />
                <Route exact path="/groups/:groupId(\d+)" render={props => {
                    return < GroupRestaurants />
                }}/>
            </React.Fragment>
        )
    }
}