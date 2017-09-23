import React from 'react';
import Header from './header'
import Admin from './admin';
import Card from './card';
import recettes from '../recettes';
import base from '../base';

class App extends React.Component {
	
	state = {
		recettes: {}
	};

	componentWillMount(){
		this.ref = base.syncState(`${(this.props.params.pseudo)}/recettes`, {
			context: this,
			state: 'recettes'
		});
	}

	componentWillUnount(){
		base.removeBinding(this.ref)
	}

	loadingRecetteEx = () => {
		this.setState({ recettes });
	}
	
	updateRecipe = (key, updateRecipe) => {
		const recettes = {...this.state.recettes}
		recettes[key] = updateRecipe
		this.setState({ recettes });
	}
	addRecette = (recette) => {
		console.log(' add recette', recette);
		const recettes = {...this.state.recettes}
		const timestamp = Date.now();
		recettes[`recette-${timestamp}`] = recette
		this.setState({recettes});
	}
	render(){
		const cards = Object.keys(this.state.recettes).map( key => <Card key={key} details={this.state.recettes[key]} />)
		return(
			<div className="box">
				<Header pseudo={this.props.params.pseudo} />
				<div className="cards">
					{cards}
				</div>
				<Admin 
					recettes={this.state.recettes}
					loadingRecetteEx={this.loadingRecetteEx} 
					addRecette={this.addRecette} 
					updateRecipe={this.updateRecipe} />
			</div>
		)
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	}
}

export default App