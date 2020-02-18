var itemsWithBackgroundColor = document.getElementsByClassName('changeColorWithBackground');

App({ el: 'background' });

function App(conf) {
	conf = {
		fov: 140,
		cameraZ: 100,
		cameraX: 0,
		cameraY: 10,
		xyCoef: 50,
		zCoef: 15,
		lightIntensity: 0.8,
		colors: [0x000000, 0x147625, 0x151f60, 0x229679, 0x37d11d],
		...conf
	};

	let renderer, scene, camera, cameraCtrl;
	let width, height, cx, cy, wWidth, wHeight;
	const TMath = THREE.Math;

	let plane;
	const simplex = new SimplexNoise();

	const mouse = new THREE.Vector2();
	const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
	const mousePosition = new THREE.Vector3();
	const raycaster = new THREE.Raycaster();


	if(window.innerWidth > 500)
		init();

	function init(){
		renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(conf.el), antialias: true, alpha: true });
		camera = new THREE.PerspectiveCamera(conf.fov);
		camera.position.z = conf.cameraZ;
		camera.position.y = conf.cameraY;
		camera.position.x = conf.cameraX;

		updateSize();
		window.addEventListener('resize', updateSize, false);

		document.addEventListener('mousemove', e => {
			const v = new THREE.Vector3();
			camera.getWorldDirection(v);
			v.normalize();
			mousePlane.normal = v;
			mouse.x = (e.clientX / width) * 2 - 1;
			mouse.y = - (e.clientY / height) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);
			raycaster.ray.intersectPlane(mousePlane, mousePosition);
		});

		initScene();
		animate();
	}

	function initScene() {
		scene = new THREE.Scene();
		initLights();

		let mat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
		let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
		plane = new THREE.Mesh(geo, mat);
		scene.add(plane);

		plane.rotation.x = -Math.PI / 2 - 0.2;
		plane.position.y = -25;
		camera.position.z = 60;
	}

	function initLights() {
		const r = 45;
		const y = 20;
		const lightDistance = 500;

		light = new THREE.AmbientLight(conf.colors[0]);
		 scene.add(light);

		light1 = new THREE.PointLight(conf.colors[1], conf.lightIntensity, lightDistance);
		light1.position.set(0, y, r);
		scene.add(light1);
		light2 = new THREE.PointLight(conf.colors[2], conf.lightIntensity, lightDistance);
		light2.position.set(0, -y, -r);
		scene.add(light2);
		light3 = new THREE.PointLight(conf.colors[3], conf.lightIntensity, lightDistance);
		light3.position.set(r, y, 0);
		scene.add(light3);
		light4 = new THREE.PointLight(conf.colors[4], conf.lightIntensity, lightDistance);
		light4.position.set(-r, y, 0);
		scene.add(light4);
		
	}

	function animate() {
		requestAnimationFrame(animate);

		animatePlane();

		renderer.render(scene, camera);
	};

	function animatePlane() {
		gArray = plane.geometry.attributes.position.array;
		const time = Date.now() * 0.0002;
		for (let i = 0; i < gArray.length; i += 3) {
			gArray[i + 2] = simplex.noise4D(gArray[i] / conf.xyCoef, gArray[i + 1] / conf.xyCoef, time, mouse.x + mouse.y) * conf.zCoef;
		}
		plane.geometry.attributes.position.needsUpdate = true;
	}

	function animateLights() {
		const time = Date.now() * 0.001;
		const d = 50;
		light1.position.x = Math.sin(time * 0.1) * d;
		light1.position.z = Math.cos(time * 0.2) * d;
		light2.position.x = Math.cos(time * 0.3) * d;
		light2.position.z = Math.sin(time * 0.4) * d;
		light3.position.x = Math.sin(time * 0.5) * d;
		light3.position.z = Math.sin(time * 0.6) * d;
		light4.position.x = Math.sin(time * 0.7) * d;
		light4.position.z = Math.cos(time * 0.8) * d;
		}

	function hexToRgb(hex) {
		  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		  return result ? {
			      r: parseInt(result[1], 16),
			      g: parseInt(result[2], 16),
			      b: parseInt(result[3], 16)
			    } : null;
	}

	function componentToHex(c)
	{
		var hex = Math.abs(c).toString(16);
  		return hex.length == 1 ? "0" + hex : hex;
	}

	function rgbToHex(r, g, b)
	{
  		return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
	}

	function updateSize() {
		width = window.innerWidth; cx = width / 2;
		console.log(document.getElementsByClassName('background-limits')[0].clientHeight);	
		height = document.getElementsByClassName('background-limits')[0].clientHeight; cy = height / 2;
		if (renderer && camera) {
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			const wsize = getRendererSize();
			wWidth = wsize[0];
			wHeight = wsize[1];
		}
	}

	function getRendererSize() {
		const cam = new THREE.PerspectiveCamera(camera.fov, camera.aspect);
		const vFOV = cam.fov * Math.PI / 180;
		const height = 2 * Math.tan(vFOV / 2) * Math.abs(conf.cameraZ);
		const width = height * cam.aspect;
		return [width, height];
	}
}

