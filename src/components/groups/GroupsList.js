import React, { Component } from "react"
import "./GroupsList.css"
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
                <div id="groups-list-wrapper">
                    <section className="hero">
                        <div className="hero-body">
                            <h1 className="title has-text-black">Groups List</h1>
                        </div>
                    </section>
                    <section className="columns">
                        <div className="column is-one-third">
                            <section className="container">
                                <button className="button is-rounded is-primary is-outlined" onClick={() => this.props.history.push("/creategroup")}>Create a Group</button>
                            </section><br />
                            <nav className="panel">
                            <div className="panel-heading">The Usual Groups</div>
                            {
                                this.props.groups.map(group => {
                                    if (group.id !== userGroupId.find(id => id === group.id)) {
                                        return <div className="panel-block" key={group.id}>
                                            <p className="control">{group.name}</p>
                                            <button id={group.id} onClick={this.moveUserIntoGroup}
                                            className="button is-rounded is-primary is-focused is-inverted"
                                            >Join Group</button>
                                        </div>
                                    }
                                }

                                )
                            }
                            </nav>
                        </div>
                        <div className="column is-two-thirds">
                            <h1 className="title is-3">{this.props.user.firstName}'s Groups</h1>
                            <div className="columns is-multiline">
                            {
                                this.props.userGroups.map(userGroup => {
                                    return <div className="column is-one-third"><div className="card" key={userGroup.id}>
                                        <p className="card-content">{this.props.groups.find(group => group.id === userGroup.groupId).name}</p>
                                        <div className="card-footer">
                                        <button id={userGroup.groupId} onClick={this.saveGroupRestaurant}
                                        className="button card-footer-item is-small is-paddingless
                                        is-info is-outlined"
                                        >See Group</button>
                                        <button className="button card-footer-item is-small is-paddingless is-danger is-outlined">Leave Group</button>
                                        </div>
                                    </div></div>

                                })
                            }
                            </div>
                        </div>
                    </section>
                </div>
            </React.Fragment >
        )
    }
}