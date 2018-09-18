import React, { Component } from 'react';
import "./HomePage.css"
import Logo from "../../images/usualLogo.png"

export default class HomePage extends Component {

    render() {
        return (
            <React.Fragment>
                <div id="homepage-wrapper">
                    <section class="hero is-large" id="the-hero">
                        <div class="hero-body has-text-centered" id="hero-body">
                            <div class="container">
                                <img src={Logo} id="theusual-logo"/>
                            </div>
                        </div>
                    </section>



                </div>

            </React.Fragment>

        )
    }

}