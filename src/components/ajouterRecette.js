import React from 'react';

class AddRecipe extends React.Component {
	
	state = {
		nom: "",
		image:"",
		ingredients:"",
		instructions:""
	}

	recipe = (event) => {
		event.preventDefault();
		this.props.addRecette(this.state);
		this.setState({
			nom: "",
			image: "",
			ingredients: "",
			instructions: ""
		});
		
	};
	render(){
		return(
				<div className="card">
					<form className="admin-form ajouter-recette" onSubmit={e => this.recipe(e)}>
						<input type="text" value={this.state.nom} placeholder="Nom de la recette" onChange={(event) => this.setState({nom:event.target.value})} />

						<input type="text" value={this.state.image} placeholder="Adresse de l'image" onChange={(event) => this.setState({image:event.target.value})} />
						<textarea value={this.state.ingredients} rows="3" placeholder="Liste des ingredients séparés par une virgule" onChange={(event) => this.setState({ingredients:event.target.value})}></textarea>
						<textarea rows="15"  value={this.state.instructions} placeholder="Liste des instructions(une par ligne)" onChange={(event) => this.setState({instructions: event.target.value})}></textarea>
						<button type="submit"> + Ajouter une recette</button>
					</form>
				</div>
		)
	}

	// static propTypes = {
	// 	pseudo: React.PropTypes.string.isRequired
	// }
}

export default AddRecipe;