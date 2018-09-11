import React, { Component } from "react"

export default class GroupsList extends Component {

    moveUserIntoGroup = () => {
       const theUser = sessionStorage.getItem("user");
       this.props.post("groups.usersInGroup", theUser )
    }


    render() {
        return (
            <React.Fragment>
                <h1>Groups List</h1>
                <button onClick={() => this.props.history.push("/creategroup")}>Create a Group</button>
                {
                    this.props.groups.map(group => {
                        return <div className="card" key={group.id}>
                                    <p className="card-header">{group.name}</p>
                                    <button onClick={() => this.props.history.push(`/group/${group.id}`)}>Join Group</button>
                                </div>

                        }

                    )
                }


            </React.Fragment>
        )
    }
}