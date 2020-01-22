var itemsWithBackgroundColor = document.getElementsByClassName('changeColorWithBackground');

App({ el: 'background' });

function App(conf) {
	conf = {
		fov: 75,
		cameraZ: 75,
		xyCoef: 50,
		zCoef: 10,
		lightIntensity: 0.9,
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



	init();

	function init() {
		renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(conf.el), antialias: true, alpha: true });
		camera = new THREE.PerspectiveCamera(conf.fov);
		camera.position.z = conf.cameraZ;

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
		initGui();
		animate();
		applyColorChanges(conf.colors);
	}

	function initGui()
	{
		//	updateLightsColors();
		
	}
	function initScene() {
		scene = new THREE.Scene();
		initLights();

		let mat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
		// let mat = new THREE.MeshPhongMaterial({ color: 0xffffff });
		//let mat = new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.5, metalness: 0.8 });
		let geo = new THREE.PlaneBufferGeometry(wWidth, wHeight, wWidth / 2, wHeight / 2);
		plane = new THREE.Mesh(geo, mat);
		scene.add(plane);

		plane.rotation.x = -Math.PI / 2 - 0.2;
		plane.position.y = -25;
		camera.position.z = 60;
	}

	function initLights() {
		const r = 30;
		const y = 10;
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
		//	animateLights();

		renderer.render(scene, camera);
	};

	function animatePlane() {
		gArray = plane.geometry.attributes.position.array;
		const time = Date.now() * 0.0002;
		for (let i = 0; i < gArray.length; i += 3) {
			gArray[i + 2] = simplex.noise4D(gArray[i] / conf.xyCoef, gArray[i + 1] / conf.xyCoef, time, mouse.x + mouse.y) * conf.zCoef;
		}
		plane.geometry.attributes.position.needsUpdate = true;
		// plane.geometry.computeBoundingSphere();
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

	function updateLightsColors() 
	{
		conf.colors[1] = chroma.random().hex();
		conf.colors[2] = chroma.random().hex();
		conf.colors[3] = chroma.random().hex();
		conf.colors[4] = chroma.random().hex();
		light1.color = new THREE.Color(conf.colors[1]);
		light2.color = new THREE.Color(conf.colors[2]);
		light3.color = new THREE.Color(conf.colors[3]);
		light4.color = new THREE.Color(conf.colors[4]);
		applyColorChanges(conf.colors);
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

	function applyColorChanges(colors)
	{
		var css = '.changeColorWithBackground { color: ' + '#' + colors[4].toString(16) + '}';
		var style = document.createElement('style');

		if (style.styleSheet) 
    			style.styleSheet.cssText = css;
		else
			style.appendChild(document.createTextNode(css));
		document.getElementsByTagName('head')[0].appendChild(style);
		/*
		let brighterValue = 0;
		let brighterColor = {
			'r': 0,
			'g': 0,
			'b': 0
		};
		colors[1] = hexToRgb(colors[1]);
		colors[2] = hexToRgb(colors[2]);
		colors[3] = hexToRgb(colors[3]);
		colors[4] = hexToRgb(colors[4]);
		for(let i = 1; i < 5; i++)
		{	
			if(colors[i].b * colors[i].b * 0.068 + colors[i].r * colors[i].r * 0.241 + colors[i].g * colors[i].g * 0.691  > brighterValue)
			{
				brighterColor.r = colors[i].r;
				brighterColor.b = colors[i].b;
				brighterColor.g = colors[i].g;
				brighterValue = colors[i].b * colors[i].b * 0.068 + colors[i].r * colors[i].r * 0.241 + colors[i].g * colors[i].g * 0.691;
			}
		}
			console.log("La couleur la plus brilliante est: ");
		console.log(brighterColor);
			console.log("La brightValue[1] est: " + (colors[1].b * colors[1].b * 0.068 + colors[1].r * colors[1].r * 0.241 + colors[1].g * colors[1].g * 0.691) + " et color[1] est: ");
			console.log(colors[1]);
			console.log("La brightValue[2] est: " + (colors[2].b * colors[2].b * 0.068 + colors[2].r * colors[2].r * 0.241 + colors[2].g * colors[2].g * 0.691) + " et color[2] est: ");
			console.log(colors[2]);
			console.log("La brightValue[3] est: " + (colors[3].b * colors[3].b * 0.068 + colors[3].r * colors[3].r * 0.241 + colors[3].g * colors[3].g * 0.691) + " et color[3] est: ");
			console.log(colors[3]);
			console.log("La brightValue[4] est: " + (colors[4].b * colors[4].b * 0.068 + colors[4].r * colors[4].r * 0.241 + colors[4].g * colors[4].g * 0.691) + " et color[4] est: ");
			console.log(colors[4]);
		for (let i = 0; i < itemsWithBackgroundColor.length; i++)
		{
			itemsWithBackgroundColor[i].style["color"] = rgbToHex(brighterColor.r, brighterColor.g, brighterColor.b);
		}
		*/
	}


	function updateSize() {
		width = window.innerWidth; cx = width / 2;
		
		height = window.innerHeight; cy = height / 2;
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

