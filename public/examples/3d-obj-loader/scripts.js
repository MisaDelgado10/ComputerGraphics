var scene = new THREE.Scene();

var loader_floor = new THREE.TextureLoader();
loader_floor.load('/examples/3d-obj-loader/assets/floor.jpg',function(texture){
    scene.background = texture;
});

var yoshiX = 0;
var yoshiY = 0;
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1.0, 1000 );
camera.position.z = 200;

// const light = new THREE.AmbientLight( 0x404040 ); // soft white light
// scene.add( light );

var renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement);


//Shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type =THREE.PCFSoftShadowMap;
// renderer.physicallyCorrectLights = true;
// renderer.toneMapping = THREE.ACESFilmicToneMapping;
// renderer.outputEncoding = THREE.sRGBEncoding;



var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

//LUCES
var keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.0);
keyLight.position.set(1,0,0);
keyLight.target.position.set(300,300,10);
keyLight.castShadow = true;
keyLight.shadow.bias = -0.001;
keyLight.shadow.mapSize.width = window.innerWidth;
keyLight.shadow.mapSize.height = window.innerHeight;
keyLight.shadow.camera.near = 100.0;
keyLight.shadow.camera.far = 500;
keyLight.shadow.camera.left = 500;
keyLight.shadow.camera.right = -500;
keyLight.shadow.camera.top = 500;
keyLight.shadow.camera.bottom = -500;
scene.add(keyLight);

scene.add(keyLight);

light = new THREE.AmbientLight(0x8a8a8a);
scene.add(light);

// scene.add(keyLight);
// scene.add(fillLight);
// scene.add(backLight);

//CAMA
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
                node.castShadow = false;
                node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(-150,0,0);
        // mesh.rotation.x = -Math.PI/2;

    });

});

//SILLA
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

//DESK
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

 // AUDIO
 var audioLoader = new THREE.AudioLoader();
 var listener = new THREE.AudioListener();
 var audio = new THREE.Audio(listener);
 audioLoader.load('/examples/3d-obj-loader/assets/Moby-Porcelain.ogg', function(buffer) {
     audio.setBuffer(buffer);
     audio.setLoop(true);
     audio.setVolume(0.4);
 });

//YOSHI
mtlLoader.load('yoshi.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('yoshi.obj', function (mesh) {

        var objBbox = new THREE.Box3().setFromObject(mesh);

        // Geometry vertices centering to world axis
        var bboxCenter = objBbox.getCenter().clone();
        bboxCenter.multiplyScalar(-1);

        mesh.traverse(function (child) {
          if (child instanceof THREE.Mesh) {
            child.geometry.translate(bboxCenter.x, bboxCenter.y, bboxCenter.z);
          }
        });

        objBbox.setFromObject(mesh); // Update the bounding box

        mesh.position.set(0,0,0);
        mesh.castShadow = true;
        mesh.receiveShadow = true; 

        var xSpeed = 10;
        var ySpeed = 10;
        
        var playingSong = false;

        document.addEventListener("keydown", onDocumentKeyDown, false);
        function onDocumentKeyDown(event) {
            var keyCode = event.which;
            if (keyCode == 87) {
                mesh.position.y += ySpeed
                mesh.rotation.z = Math.PI;
            } else if (keyCode == 83) {
                mesh.position.y -= ySpeed;
                mesh.rotation.z = 0;
            } else if (keyCode == 65) {
                mesh.position.x -= xSpeed;
                mesh.rotation.z= -Math.PI/2;
            } else if (keyCode == 68) {
                mesh.position.x += xSpeed;
                mesh.rotation.z= Math.PI/2;
                console.log(mesh.position.x+" "+mesh.position.y);
        scene.add(mesh);
            } else if (keyCode == 32) {
                playingSong = !playingSong;
                if(playingSong === true  && (mesh.position.x > 90 && mesh.position.x < 130 && (mesh.position.y > 40 && mesh.position.y < 100))){
                    audio.play();
                }
                else if((mesh.position.x > 90 && mesh.position.x < 130 && (mesh.position.y > 40 && mesh.position.y < 100))){
                    audio.stop();
                }
            }
        };
        scene.add(mesh);
    });
});


//COMPUTADORA
mtlLoader.load('computer.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('computer.obj', function (mesh) {

        mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
                // node.castShadow = true;
                // node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(160,90,28);
        // mesh.rotation.x = -Math.PI/2;
    });

});

//LAMPARA
mtlLoader.load('lamp.mtl', function (materials) {

    materials.preload();

    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('/examples/3d-obj-loader/assets/');
    objLoader.load('lamp.obj', function (mesh) {

        mesh.traverse(function(node){
            if(node instanceof THREE.Mesh){
                node.castShadow = true;
                node.receiveShadow = true; 
            }
        });

        scene.add(mesh);
        mesh.position.set(180,70,0);
        // mesh.rotation.x = -Math.PI/2;
    });

});



var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};



animate();