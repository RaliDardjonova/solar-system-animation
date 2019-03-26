var k=0;
var v = 5;

$('#btn-start-animation').on('click', function () {
  Start(TYPE);
});

var TYPE;
var timeSlider = $('#lifespan'),
  timeControl = new TimeControl(timeSlider);

timeSlider.on('change', function (e) {
  k = parseInt(e.value.newValue, 10);
  updateDataView(k);
  if(animateStar) animateStar(k++, v, sunData);
});

var sceneView = $('#scene');
//---------------------

var renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneView.width(), window.innerHeight/2 );
sceneView.append(renderer.domElement);
/*
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.setClearColor('dimgray');
*/

// включваме генерирането на меки сенки
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0,200,0);
camera.lookAt(new THREE.Vector3(0,20,0));

//controling with the mouse
var controls = new THREE.TrackballControls( camera,  renderer.domElement );
controls.rotateSpeed = 1.0;
controls.panSpeed = 0.8;
controls.noZoom = true;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;

// координати на пилон
//	var xp = 40*Math.random();
//	var yp = 20+40*Math.random();
//	var zp = 40*Math.random();

var xp = 0;
var yp = 0;
var zp = 0;


// създаване на топка
var ball = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,32),
  new THREE.MeshPhongMaterial({color:'white',shininess: 10, specular: 0xffffff})
);
ball.castShadow = true;
scene.add( ball );


// създаване на земята
var ground = new THREE.Mesh(
  new THREE.BoxGeometry(200,2,140),
  new THREE.MeshPhongMaterial({color:'steelblue',shininess: 100, specular: 0xffffff})
);
ground.position.y = -1;
ground.receiveShadow = true;
scene.add( ground );

// създаване на пилон
var sun = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,32),
  new THREE.MeshPhongMaterial({color:'yellow',shininess: 10, specular: 0xffffff})
);
ball.castShadow = true;
sun.position.x = xp;
sun.position.y = yp;
sun.position.z = xp;
scene.add( sun );

var radius   = 30,
    segments = 64,
    material = new THREE.LineBasicMaterial( { color: 0x0000ff } ),
    geometry = new THREE.CircleGeometry( radius, segments );

// Remove center vertex
geometry.vertices.shift();

// Non closed circle with one open segment:
//scene.add( new THREE.Line( geometry, material ) );

// To get a closed circle use LineLoop instead (see also @jackrugile his comment):
var loop = new THREE.LineLoop( geometry, material );
loop.rotation.x = Math.PI / 2;
scene.add(loop);

// светлина
var light = new THREE.PointLight();
light.position.set (0,0,0);
light.castShadow = true;
scene.add( light );

scene.add( new THREE.AmbientLight('white',0.7) );

var clock = new THREE.Clock();

function drawFrame()
{
  requestAnimationFrame( drawFrame );

  var t = clock.getElapsedTime();

  // движение в кръг с радиус 30
  ball.position.x = xp+30*Math.cos(t);
  ball.position.y = yp/2;
  ball.position.z = zp+30*Math.sin(t);

  //scene.rotation.y += 0.002;

  renderer.render( scene, camera );
}

drawFrame();


















//-----------------

scene.add( new THREE.AmbientLight('white',2) );
/*
function drawFrame()
{
  requestAnimationFrame( drawFrame );
  if (animateCorona) animateCorona(animateCoronaFrames++);
  controls.update();
  renderer.render( scene, camera );
}
*/
//var MASS;
/*
function animateLife()
{
  var masses = {
    star1: 0.1,
    star2: 0.16,
    sun: 1,
    star3: 10,
    star4: 100
  };

  if(!isPaused)
  {
      requestAnimationFrame(animateLife);
      console.log('MASS: ' + MASS);
      var selectedStarData;
      if(MASS == CONFIG.stars.sun.mass)
      {
        if(animateStar) animateStar(k++, v, sunData, 200, 800);
        selectedStarData = sunData;
      } else if (MASS == CONFIG.stars.star1.mass) {
        if(animateStar) animateStar(k++, v, sunData);
      } else if (MASS == CONFIG.stars.star2.mass) {
        if(animateStar) animateStar(k++, v, star2Data,  0.22, 1);
        selectedStarData = star2Data;
      } else if (MASS == CONFIG.masses.stars.star3.mass) {
        if(animateStar) animateStar(k++, v, sunData);
      } else if (MASS == CONFIG.masses.stars.star4.mass) {
        if(animateStar) animateStar(k++, v, sunData);
      }

      timeControl.update(k);
      updateDataView(k, selectedStarData);
      controls.update();
      renderer.render(scene, camera);
  }
}
*/
function Start(mass)
{
    MASS = mass;
    isPaused = false;
    animateLife();
}

function Pause()
{
    isPaused = true;
}

/*
drawFrame();

function updateDataView(k, starData) {
  document.getElementById("range").innerHTML=k;
  var starDataIndex = Math.floor(k/v);
  document.getElementById("sundata").innerHTML=starData[starDataIndex]['time'];
  document.getElementById("sundata-temperature").innerHTML=starData[starDataIndex]['temperature'];
  document.getElementById("sundata-radius1").innerHTML= starData[starDataIndex]['radius'];
}
*/
