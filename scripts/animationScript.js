//var k=0;
//var v = 5;
var EARTH_PERIOD = 10;
var TYPE;
var type;
$('#btn-start-animation').on('click', function () {
  type = $( "#selectAnimation" ).val();
  console.log(type);
  Start(type);
});
/*
var TYPE;
var timeSlider = $('#lifespan'),
  timeControl = new TimeControl(timeSlider);

timeSlider.on('change', function (e) {
  k = parseInt(e.value.newValue, 10);
  updateDataView(k);
  if(animateStar) animateStar(k++, v, sunData);
});
*/
var sceneView = $('#scene');
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth*(3/4), window.innerHeight*(3/4));
sceneView.append(renderer.domElement);
renderer.setClearColor('dimgray');

// включваме генерирането на меки сенки
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 30, window.innerWidth/window.innerHeight, 0.1, 10000 );
camera.position.set(0,600,0);
camera.lookAt(new THREE.Vector3(0,0,0));

//controling with the mouse

var controls = new THREE.TrackballControls( camera );
//controls.addEventListener('change', render);
//controls.target.set(0, 0, 0);
/*
controls.rotateSpeed = 1.0;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
*/
  // координати на пилон
  //	var xp = 40*Math.random();
  //	var yp = 20+40*Math.random();
  //	var zp = 40*Math.random();

var xp = 0;
var yp = 0;
var zp = 0;


  // създаване на топка
  /*
var ball = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,32),
  new THREE.MeshPhongMaterial({color:'white',shininess: 10, specular: 0xffffff})
);
ball.castShadow = true;
scene.add( ball );
*/

  // създаване на земята
  /*
var ground = new THREE.Mesh(
  new THREE.BoxGeometry(300,2,240),
  new THREE.MeshPhongMaterial({color:'darkblue',shininess: 100, specular: 0xffffff})
);
ground.position.y = -1;
ground.receiveShadow = true;
scene.add( ground );
*/
  // създаване на пилон
var sun = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,32),
  new THREE.MeshPhongMaterial({color:'yellow',shininess: 10, specular: 0xffffff})
);

sun.position.x = xp;
sun.position.y = yp;
sun.position.z = xp;
scene.add( sun );

/*
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
*/

//Mercury
var mercuryCurve = new THREE.EllipseCurve(11.91,0 ,57.91,56.67,0,2*Math.PI,false);
var mercuryPath = new THREE.Path( mercuryCurve.getPoints( 2000 ) );
var mercuryGeo = mercuryPath.createPointsGeometry( 50 );

mercuryEllipse = new THREE.Line(
    mercuryGeo,
    new THREE.LineBasicMaterial( { color : 0xffaa00, linewidth : 2 } )
);
mercuryEllipse.color = 'orange';
scene.add(mercuryEllipse);
mercuryEllipse.rotation.set(Math.PI/2, 0, 0);

var mercury = new THREE.Mesh(
  new THREE.SphereGeometry(6,20,20),
  new THREE.MeshPhongMaterial({color:'orange',shininess: 10, specular: 0xffffff})
);
scene.add(mercury);
//mercuryEllipse.position.set(11.91,0,0);

//Venus
var venusCurve = new THREE.EllipseCurve(0,0.73,108.2, 108.2,0,2*Math.PI,false);
var venusPath = new THREE.Path( venusCurve.getPoints( 2000 ) );
var venusGeo = venusPath.createPointsGeometry( 50 );

venusEllipse = new THREE.Line(
    venusGeo,
    new THREE.LineBasicMaterial( { color : 0xff0000 } )
);
scene.add(venusEllipse);
venusEllipse.rotation.set(Math.PI/2, 0, 0);

var venus = new THREE.Mesh(
  new THREE.SphereGeometry(2,20,20),
  new THREE.MeshPhongMaterial({color:'green',shininess: 10, specular: 0xffffff})
);
scene.add(venus);

//Earth
var earthCurve = new THREE.EllipseCurve(0,-2.5,149.60, 149.58,0,2*Math.PI,false);
var earthPath = new THREE.Path( earthCurve.getPoints( 2000 ) );
var earthGeo = earthPath.createPointsGeometry( 50 );

earthEllipse = new THREE.Line(
    earthGeo,
    new THREE.LineBasicMaterial( { color : 0xff0000 } )
);
scene.add(earthEllipse);
earthEllipse.rotation.set(Math.PI/2, 0, 0);

var earth = new THREE.Mesh(
  new THREE.SphereGeometry(6,20,20),
  new THREE.MeshPhongMaterial({color:'green',shininess: 10, specular: 0xffffff})
);
scene.add(earth);

//Mars
var marsCurve = new THREE.EllipseCurve(0,-21.3, 227.94, 226.94,0,2*Math.PI,false);
var marsPath = new THREE.Path( marsCurve.getPoints( 2000 ) );
var marsGeo = marsPath.createPointsGeometry( 50 );

marsEllipse = new THREE.Line(
    marsGeo,
    new THREE.LineBasicMaterial( { color : 0xff0000 } )
);
scene.add(marsEllipse);
marsEllipse.rotation.set(Math.PI/2, 0, 0);

var mars = new THREE.Mesh(
  new THREE.SphereGeometry(6,32,32),
  new THREE.MeshPhongMaterial({color:'green',shininess: 10, specular: 0xffffff})
);
scene.add(mars);

//Jupiter
var jupiterCurve = new THREE.EllipseCurve(-38.05, 0, 778.57, 777.5 ,0,2*Math.PI,false);
var jupiterPath = new THREE.Path( jupiterCurve.getPoints( 2000 ) );
var jupiterGeo = jupiterPath.createPointsGeometry( 50 );

jupiterEllipse = new THREE.Line(
    jupiterGeo,
    new THREE.LineBasicMaterial( { color : 0xff0000 } )
);
scene.add(jupiterEllipse);
jupiterEllipse.rotation.set(Math.PI/2, 0, 0);

var jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(10,32,32),
  new THREE.MeshPhongMaterial({color:'orange',shininess: 10, specular: 0xffffff})
);
scene.add(jupiter);

// Venus to Earth orbit
var type2Curve = new THREE.EllipseCurve(0, 20.694471, 128.903398, 127.231383 ,0,2*Math.PI,false);
var type2Path = new THREE.Path(type2Curve.getPoints(2000));
var type2Geo = type2Path.createPointsGeometry( 50 );

type2Ellipse = new THREE.Line(
    type2Geo,
    new THREE.LineBasicMaterial( { color : 0xff00ff } )
);
scene.add(type2Ellipse);
type2Ellipse.rotation.set(Math.PI/2, 0, 0);

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
  var v;
  // движение в кръг с радиус 30
  /*
  ball.position.x = xp+30*Math.cos(t);
  ball.position.y = yp/2;
  ball.position.z = zp+30*Math.sin(t);
  */

  //console.log(t);
  v = mercuryPath.getPoint((t%(EARTH_PERIOD*0.241))/(EARTH_PERIOD*0.241));
  mercury.position.set(v.x, 0, v.y);

  v = venusPath.getPoint((t%(EARTH_PERIOD*0.615))/(EARTH_PERIOD*0.615));
  venus.position.set(v.x, 0, v.y);

  v = earthPath.getPoint((t%EARTH_PERIOD)/EARTH_PERIOD);
  earth.position.set(v.x, 0, v.y);

  v = marsPath.getPoint((t%(EARTH_PERIOD*1.881))/(EARTH_PERIOD*1.881));
  mars.position.set(v.x, 0, v.y);

  v = jupiterPath.getPoint((t%(EARTH_PERIOD*11.86))/(EARTH_PERIOD*11.86));
  jupiter.position.set(v.x, 0, v.y);
  //scene.rotation.y += 0.002;
  controls.update();
  renderer.render( scene, camera );
}

function animate(){
  requestAnimationFrame(animate);
  var t = clock.getElapsedTime();
  var v;
  var dif1, dif;
  console.log("type: ");
  console.log(TYPE);
  if(TYPE == 2){

    if(t/(EARTH_PERIOD*0.615) > 0.75){
    //  console.log((t%(EARTH_PERIOD*0.79))/(EARTH_PERIOD*0.79));
      dif1 = 0.75*0.615*EARTH_PERIOD;
      if((t - dif1 + EARTH_PERIOD*0.79*0.75)/(EARTH_PERIOD*0.79) > 1.25 ){
        dif2 = 1.25*EARTH_PERIOD*0.79 + dif1 - EARTH_PERIOD*0.79*0.75;
        v = earthPath.getPoint(((t - dif2 + EARTH_PERIOD*0.25)%(EARTH_PERIOD))/(EARTH_PERIOD));
        venus.position.set(v.x, 0, v.y);
      } else {
        console.log(dif1);

        v = type2Path.getPoint(((t - dif1 + EARTH_PERIOD*0.79*0.75)%(EARTH_PERIOD*0.79))/(EARTH_PERIOD*0.79));
        venus.position.set(v.x, 0, v.y);
      }
    } else {
      v = venusPath.getPoint((t%(EARTH_PERIOD*0.615))/(EARTH_PERIOD*0.615));
      venus.position.set(v.x, 0, v.y);
    }

    v = earthPath.getPoint((t%EARTH_PERIOD)/EARTH_PERIOD);
    earth.position.set(v.x, 0, v.y);


  } else {
    v = venusPath.getPoint((t%(EARTH_PERIOD*0.615))/(EARTH_PERIOD*0.615));
    venus.position.set(v.x, 0, v.y);
  }
  controls.update();
  renderer.render( scene, camera );
}

//drawFrame();
var isPaused;
function Start(type)
{
    TYPE = type;
   console.log(type);
    isPaused = false;
    animate();

}

function Pause()
{
    isPaused = true;
}