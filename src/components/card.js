import React from 'react';

class Card extends React.Component {
	render(){
		const ingredient = this.props.details.ingredients
			.split(',')
			.map((item, key) => <li key={key}> {item} </li>);
		
			const instructions = this.props.details.instructions
			.split('\n')
			.map((item, key) => <li key={key}> {item} </li>);
		
		return(
			<div className="card" >
				<div className="image"> <img alt={this.props.details.nom} src={this.props.details.image} /> </div>
				<div className="recette">
					<h2>{this.props.details.nom}</h2>
					<ul className="liste-ingredients">
						{ingredient}
					</ul>
					<ol className="liste-instruction">
					{instructions}
					</ol>
				</div>
				
			</div>
		)
	}

	static propTypes = {
		details: React.PropTypes.object.isRequired
	}
}

export default Card;