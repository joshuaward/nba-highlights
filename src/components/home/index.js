import React, { Component } from 'react'; 
import axios from 'axios';

import { URL_HOME } from '../utils/paths';

// components
import SliderWidget from '../utils/slider';
import Subscriptions from '../utils/subscribe';
import Blocks from './blocks';
import Poll from './poll';

class Home extends Component {
	state = {
		home: '',
	}

	componentDidMount() {
		axios.get(URL_HOME)
			.then(response => {
				console.log(response.data)
				this.setState({
					home: response.data
				})
			})
	}

	render() {
		return(
			<div>
				<SliderWidget slides={this.state.home.slider} />
				<Subscriptions />
				<Blocks blocks={this.state.home.blocks} />
				<Poll />
			</div>
		)
	}
}

export default Home;