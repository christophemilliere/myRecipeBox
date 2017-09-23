import React from 'react';
import AddRecipe from './ajouterRecette';

class Admin extends React.Component {

	updateReci = (event, key) => {
		const recipe = this.props.recettes[key]
		const update = {
			...recipe,
			[event.target.name]: event.target.value
		}

		this.props.updateRecipe(key, update)
	}

	renderAdmind = (key) => {
		const recipe = this.props.recettes[key];
		return(
			<div className="card" key={key}>
				<form className="admin-form">
					<input type="text" name='nom' value={recipe.nom} 
						placeholder="Nom de la recette" 
						onChange={(event) => this.updateReci(event, key)} />

					<input type="text" name='image' value={recipe.image} 
						placeholder="Adresse de l'image" 
						onChange={(event) => this.updateReci(event, key) } />
					<textarea name='ingredients' value={recipe.ingredients} rows="3" 
						placeholder="Liste des ingredients séparés par une virgule" 
						onChange={(event) => this.updateReci(event, key) }></textarea>
					<textarea rows="15" name='instructions'  value={recipe.instructions} 
						placeholder="Liste des instructions(une par ligne)" 
						onChange={(event) => this.updateReci(event, key) }></textarea>
				</form>
			</div>
		)
	}
	
	render(){
		const adminCardForm = Object
			.keys(this.props.recettes)
			.map(this.renderAdmind)
		return(
			<div className="cards">
				<AddRecipe  addRecette={this.props.addRecette} />
				{adminCardForm}
				<footer>
				<button onClick={ this.props.loadingRecetteEx }>Remplir</button>
				</footer>
			</div>
		)
	}

	static propTypes = {
		loadingRecetteEx: React.PropTypes.func.isRequired,
		addRecette: React.PropTypes.func.isRequired,
		updateRecipe: React.PropTypes.func.isRequired,
		recettes: React.PropTypes.object.isRequired
	}
}

export default Admin;