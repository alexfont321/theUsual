import React, { Component } from "react"
// import GroupRestaurants from "./GroupRestaurants"
// import { Route } from 'react-router-dom';





export default class GroupsList extends Component {

    state = {
        groups: [],
        userGroups: [],
        user: {},
        joinGroup: false
    }

    componentDidMount() {
        const newState = {
            groups: "",
            userGroups: "",
            user: ""
        }
        this.setState(newState)

    }

    moveUserIntoGroup = e => {
        e.preventDefault();

        const userGroup = {
            groupId: parseInt(e.target.id, 0),
            userId: this.props.user.id
        }

        this.props.postUserGroup("userGroups", userGroup).then(() => this.setState({ joinGroup: true }))

    }


    saveGroupRestaurant = e => {
        e.preventDefault();

        this.props.getDatafromGroupList(e.target.id)

        this.props.history.push(`/group/${e.target.id}`)

    }

    render() {

        const userGroupId = this.props.userGroups.map(userGroup => userGroup.groupId);
        // console.log(userGroupId)
        // let groupIdMatchUserGroup = this.props.groups.find(group => group.id === parseInt(userGroupId), 0) || {}
        // console.log(groupIdMatchUserGroup)
        // const groupName = this.props.groups.map(group => group.name)
        // console.log(groupName)

        return (
            <React.Fragment>
                <h1>Groups List</h1>
                <button onClick={() => this.props.history.push("/creategroup")}>Create a Group</button>
                {
                    this.props.groups.map(group => {
                        if (group.id !== userGroupId.find(id => id === group.id)) {
                            return <div className="card" key={group.id}>
                                <p className="card-header">{group.name}</p>
                                <button id={group.id} onClick={this.moveUserIntoGroup}>Join Group</button>
                            </div>
                        }
                    }

                    )
                }
                <h1>My Groups</h1>
                {
                    this.props.userGroups.map(userGroup => {
                        return <div className="card" key={userGroup.id}>
                            <p>{this.props.groups.find(group => group.id === userGroup.groupId).name}</p>
                            <button id={userGroup.groupId} onClick={this.saveGroupRestaurant}>See Group</button>
                        </div>

                    })
                }

            </React.Fragment>
        )
    }
}