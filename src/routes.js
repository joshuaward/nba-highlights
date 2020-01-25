import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Components
import Header from './components/header';
import Footer from './components/footer';
import Home from './components/home';
import Teams from './components/teams';
import Team from './components/teams/team';

const Routes = () => {
	return(
		<BrowserRouter>
			<Header />
			<Switch>
				<Route path="/teams/:id" component={Team} />
				<Route path="/teams" component={Teams} />
				<Route path="/" exact component={Home} />
			</Switch>
			<Footer />
		</BrowserRouter>
	)
}

export default Routes;