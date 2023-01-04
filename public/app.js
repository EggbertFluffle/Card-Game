import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Card } from './card.js';

class Game {
	constructor() {
		this._initRendering();
		this.animate = this.animate.bind(this);

		this._initScene();

		this.controls = new OrbitControls(this.camera, this.renderer.domElement)

		this.animate();
	}

	_initRendering() {
		this.scene = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(this.renderer.domElement);
		this.textures = {};
		let textureLoader = new THREE.TextureLoader();
		this.textures.cardFace = textureLoader.load("./textures/CardPlaceholder_Face.png")
		this.textures.cardBack = textureLoader.load("./textures/CardPlaceholder_Back.png");
		this.textures.board = textureLoader.load("./textures/BoardPlaceholder.png");
	}

	_initScene() {
		this.boardModel = new THREE.Mesh(
			new THREE.BoxGeometry(6, 0.5, 4),
			new THREE.MeshNormalMaterial({ map: this.textures.board })
		);
		this.boardModel.position.set(0, -0.5, 0);
		this.scene.add(this.boardModel);
		
		this.card = new Card({
			x: -2,
			y: 0,
			z: -1,
			name: "First Card",
			description: "This is the first card developed!",
			type: "Entity",
			playCost: 5,
			attack: 5,
			defense: 5
		});
		this.card.setTexture(this.textures.cardFace);
		this.scene.add(this.card.getModel());

		this.camera.position.set(0, 2, 3);
		this.camera.lookAt(0, 0, 0);
	}

	animate() {
		requestAnimationFrame(this.animate);
		
		this.renderer.render(this.scene, this.camera);
	}
}

const game = new Game();