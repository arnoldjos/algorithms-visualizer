import React, { Component } from "react";

import Nav from "../components/Nav/Nav";

export default class Layout extends Component {
	render() {
		return (
			<React.Fragment>
				<Nav />
				<div>{this.props.children}</div>
			</React.Fragment>
		);
	}
}
