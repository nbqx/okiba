

(function(root){
  var Backbone = root.Backbone;
  var _ = root._;
  var $ = root.jQuery;
  var THREE = root.THREE;

  var container;
  var camera, scene, renderer,material;
  var geometry, group;
  var mouseX = 0, mouseY = 0;

  var windowHalfX = window.innerWidth / 2;
  var windowHalfY = window.innerHeight / 2;

  var O = {};
  _.extend(O,Backbone.Events);
 

  O.on('play',function(o){
    mouseX = mouseX + Math.floor(o.dur)*(_.random(-5,5));
    mouseY = mouseY + Math.floor(o.note)*(_.random(-5,5));
    
  });

  function init() {

	  container = document.createElement( 'div' );
	  document.body.appendChild( container );

	  camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	  camera.position.z = 500;

	  scene = new THREE.Scene();
	  scene.fog = new THREE.Fog( 0xffffff, 1, 10000 );

	  var geometry = new THREE.CubeGeometry(100,100,100);
	  material = new THREE.MeshNormalMaterial({wireframe: true});

	  group = new THREE.Object3D();

	  for ( var i = 0; i < 1000; i ++ ) {

		  var mesh = new THREE.Mesh( geometry, material );
		  mesh.position.x = Math.random() * 2000 - 1000;
		  mesh.position.y = Math.random() * 2000 - 1000;
		  mesh.position.z = Math.random() * 2000 - 1000;

		  mesh.rotation.x = Math.random() * 2 * Math.PI;
		  mesh.rotation.y = Math.random() * 2 * Math.PI;

		  mesh.matrixAutoUpdate = false;
		  mesh.updateMatrix();

		  group.add( mesh );
	  }

	  scene.add( group );

	  renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true, clearColor:0xffffff});
	  renderer.setSize( window.innerWidth, window.innerHeight );
	  renderer.sortObjects = false;

	  container.appendChild( renderer.domElement );
	  window.addEventListener( 'resize', onWindowResize, false );

  }

  function onWindowResize() {
	  windowHalfX = window.innerWidth / 2;
	  windowHalfY = window.innerHeight / 2;

	  camera.aspect = window.innerWidth / window.innerHeight;
	  camera.updateProjectionMatrix();

	  renderer.setSize( window.innerWidth, window.innerHeight );
  }

  function onDocumentMouseMove(event) {
	  mouseX = ( event.clientX - windowHalfX );
	  mouseY = ( event.clientY - windowHalfY );
  }

  function animate() {
	  requestAnimationFrame( animate );
	  render();
  }

  function render() {
	  var time = Date.now() * 0.001;
	  var rx = Math.sin( time * 0.7 ) * 0.5,
			  ry = Math.sin( time * 0.3 ) * 0.5,
			  rz = Math.sin( time * 0.2 ) * 0.5;

	  camera.position.x += ( mouseX - camera.position.x ) * .05;
	  camera.position.y += ( - mouseY - camera.position.y ) * .05;

	  camera.lookAt( scene.position );

	  group.rotation.x = rx;
	  group.rotation.y = ry;
	  group.rotation.z = rz;

	  renderer.render( scene, camera );
  }

  $(function(){
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    init();
    animate();
  });

  root.O = O;
})(this);