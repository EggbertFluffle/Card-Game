import * as THREE from 'three';

export class Card {
	constructor({x, y, z, name, description, type, playCost, attack, defense}) {
		this.model = new THREE.Mesh(
			new THREE.BoxGeometry(1.5, 0.02, 1.5),
			new THREE.MeshBasicMaterial()
		);
		this.model.position.set(x, y, z);
		this.playCost = playCost;
		this.description = description;
		this.name = name;
		this.attack = attack;
		this.defense = defense;
	}

	setTexture(_texture) {
		this.model.material.setValues({ map: _texture})
	}

	getModel() {
		return this.model;
	}
}