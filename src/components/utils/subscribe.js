import React, { Component } from 'react';
import axios from 'axios';
import { URL_EMAIL } from '../utils/paths';

class Subscriptions extends Component {
	state = {
		email: '',
		error: false,
		success: false,
		alreadyIn: false,
	}

	onChangeInput = (event) => {
		this.setState({
			email: event.target.value
		})
	}

	clearMessages = () => {
		setTimeout(() => {
			this.setState({
				error: false,
				success: false,
				alreadyIn: false,
			})
		},3000)
	}

	saveSubscription = (email) => {
		axios.get(`${URL_EMAIL}?email=${email}`)
			.then(response => {
				if(!response.data.length) {
					axios(URL_EMAIL, {
						method: 'POST',
						headers: {
							'Accept': 'application/json',
							'Content-Type': 'application/json'
						},
						data: JSON.stringify({email})
					}).then(response => {
						this.setState({
							email: '',
							success: true,
						});
						this.clearMessages();
					})
				} else {
					this.setState({
						email: '',
						alreadyIn: true
					})
				}
			})
	}

	handleSubmit = (event) => {
		event.preventDefault();
		let email = this.state.email;
		let regex = /\S+@\S+\.\S+/;

		if(regex.test(email)) {
			// subscribe user
			this.saveSubscription(email);
		} else {
			// trigger error
			this.setState({
				error: true
			})
		}
		// clear messages
		this.clearMessages();
	}

	render() {
		const state = this.state;

		return(
			<div className="subscribe_panel">
				<h3>Subscribe to Us</h3>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input onChange={this.onChangeInput} type="text" value={state.email} placeholder="you@address.com" />
						<div className={state.error ? "error show" : "error"}>Check your email Address.</div>
						<div className={state.success ? "success show" : "success"}>Thank you!</div>
						<div className={state.alreadyIn ? "success show" : "success"}>You're already in our database.</div>
					</form>
				</div>
				<small>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
				</small>
			</div>
		)
	}
}

export default Subscriptions;