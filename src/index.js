// React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './index.css';
import Connexion from './components/connexion';
import App from './components/app';
import NotFound from './components/notFound';

const Root = () => {
	return(
		<BrowserRouter>
			<div>
				<Match exactly pattern="/"  component={Connexion} />
				<Match pattern="/box/:pseudo"  component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	)
}
ReactDOM.render(<Root />, document.getElementById('root'));