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
		const recettes = {...this.state.recettes}
		const timestamp = Date.now();
		recettes[`recette-${timestamp}`] = recette
		
	}

	deleteRecipe = ( key ) => {
		const recettes = {...this.state.recettes};
		recettes[key] = null;
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
					updateRecipe={this.updateRecipe} 
					deleteRecipe={this.deleteRecipe} 
					pseudo={this.props.params.pseudo}/>
			</div>
		)
	}

	static propTypes = {
		params: React.PropTypes.object.isRequired
	}
}

export default App