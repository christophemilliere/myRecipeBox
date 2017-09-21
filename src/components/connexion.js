import React from 'react';
class Connexion extends React.Component {
	state = {
		pseudo:  ""
	}
	goToApp = (event) => {
		event.preventDefault();
		const pseudo = this.state.pseudo
		this.context.router.transitionTo(`/box/${pseudo}`);
	};

	handhle
	render(){
		return(
			<div className="connexionBox" onSubmit={ (e) => this.goToApp(e)} >
				<form action="" className="connexion">
					<h1>Ma boite à Recettes</h1>
					<input type="text" placeholder="Votre pseudo" value={this.state.pseudo} 
					onChange={(event) => this.setState({pseudo: event.target.value})} required />
					<button type="submit">Go</button>
				</form>
			</div>
		)
	}
	static contextTypes = {
		router: React.PropTypes.object
	}
}

export default Connexion;