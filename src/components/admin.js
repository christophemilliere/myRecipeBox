import React from 'react';
import AddRecipe from './ajouterRecette';
import base from '../base';

class Admin extends React.Component {
	state = {
		uid: null,
		owner: null
	};

	componentDidMount(){
		base.onAuth(user => {
			if(user){
				this.handlingConnexion(null, {user})
			}
		});
	}
	updateReci = (event, key) => {
		const recipe = this.props.recettes[key]
		const update = {
			...recipe,
			[event.target.name]: event.target.value
		}

		this.props.updateRecipe(key, update)
	}

	connexion = (provider)  => {
		base.authWithOAuthPopup(provider, this.handlingConnexion);
	}
	handlingConnexion = (err, authData) => {
		if(err){
			console.log(err);
			return;
		}

		const boxRef = base.database().ref(this.props.pseudo);
		boxRef.once('value', snapshot => {
			const data = snapshot.val() || {};
			if(!data.owner){
				boxRef.set({
					owner: authData.user.uid
				});
			}
			this.setState({
				uid: authData.user.uid,
				owner: data.owner || authData.user.uid
			})
		})
	}
	logout = () => {
		base.unauth();
		this.setState({uid: null });
	}
	renderLogin = () => {
		return(
			<div className="login">
				<h2> Connecte toi pour créer tes recettes ! </h2>
				<button className="facebook-button" onClick={() => this.connexion('facebook') }>Me connecter avec Facebook</button>
				<button className="twitter-button" onClick={() => this.connexion('twitter') }>Me connecter avec Twitter</button>
			</div>
		)
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
				<button onClick={ () => this.props.deleteRecipe(key) } > Supprimer une recette </button>
			</div>
		)
	}
	
	render(){
		const logout = <button onClick={this.logout}>Déconnexion</button>
		if(!this.state.uid){
			return <div>{this.renderLogin()}</div>
		}

		if(this.state.uid !== this.state.owner){
			return(
				<div className="login">
					{ this.renderLogin() }
					<p> tu n'es pas le propriétaire de  cette boite à recette</p>

				</div>
			)
		}
		const adminCardForm = Object
			.keys(this.props.recettes)
			.map(this.renderAdmind)
		return(
			<div className="cards">
				<AddRecipe  addRecette={this.props.addRecette} />
				{adminCardForm}
				<footer>
				<button onClick={ this.props.loadingRecetteEx }>Remplir</button>
				{logout}
				</footer>
			</div>
		)
	}

	static propTypes = {
		loadingRecetteEx: React.PropTypes.func.isRequired,
		addRecette: React.PropTypes.func.isRequired,
		updateRecipe: React.PropTypes.func.isRequired,
		recettes: React.PropTypes.object.isRequired,
		deleteRecipe: React.PropTypes.func.isRequired,
		pseudo: React.PropTypes.string.isRequired
	}
}

export default Admin;