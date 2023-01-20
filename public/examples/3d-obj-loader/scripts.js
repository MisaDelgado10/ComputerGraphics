var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 200;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setTexturePath('/examples/3d-obj-loader/assets/');
mtlLoader.setPath('/examples/3d-obj-loader/assets/');
mtlLoader.load('bed.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('bed.obj', function (mesh) {

        mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(-150,0,0);
        // mesh.rotation.x = -Math.PI/2;

    });

});

mtlLoader.load('silla.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('silla.obj', function (mesh) {

        mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(120,50,0);
        mesh.rotation.y = -Math.PI;
        mesh.rotation.x = -Math.PI;


    });

});

mtlLoader.load('desk.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('desk.obj', function (mesh) {

        mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(100,100,0);
        // mesh.rotation.x = -Math.PI/2;
    });

});

mtlLoader.load('yoshi.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('yoshi.obj', function (mesh) {

        mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(0,0,0);
        // mesh.rotation.x = -Math.PI/2;
    });

});

mtlLoader.load('computer.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('computer.obj', function (mesh) {

        mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(150,75,50);
        // mesh.rotation.x = -Math.PI/2;
    });

});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();