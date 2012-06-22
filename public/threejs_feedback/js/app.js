var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();

var geometry = new THREE.CubeGeometry(500,500,500);

var texture = new THREE.ImageUtils.loadTexture('img/test.jpg');
texture.needsUpdate = true;

var material = new THREE.MeshLambertMaterial({color:0xffffff, map: texture}); 
var mesh = new THREE.Mesh(geometry, material);

// カメラをつくる
var camera = new THREE.PerspectiveCamera(40, width/height, 1, 1000);
camera.position.x = -100;
camera.position.y = 200;
camera.position.z = -700;
camera.lookAt(mesh.position);
scene.add(camera);

var light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position = {x:0, y:0.2, z:-1};
scene.add(light);

var cs = [];
function makeCylinder(n){
  var geo = new THREE.CylinderGeometry(0,10,100,3);
  geo.applyMatrix(new THREE.Matrix4().setRotationFromEuler(new THREE.Vector3(Math.PI/2, Math.PI,0)));
  var mt = new THREE.MeshNormalMaterial();
  for(var i=0; i<n; i++){
    var m = new THREE.Mesh(geo,mt);
    m.position.x = Math.random() * 400 - 200;
    m.position.y = Math.random() * 400 - 200;
    m.position.z = Math.random() * 400 - 200;
    m.scale.x = m.scale.y = m.scale.z = Math.random()*4+2;
    cs.push(m);
    scene.add(m);
  }
};
makeCylinder(50);

// add cube
scene.add(mesh);

// preserveDrawingBufferをtrueにするとtoDataURLがつかえる(webkit)
var renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true, clearColor:0xffffff});
renderer.setSize(width, height);

function feedback(){
  var cap = renderer.domElement.toDataURL('image/png');
  var img = new Image();
  img.src = cap;
  img.width = 640;
  img.height = 640;
  var tt = new THREE.Texture(img);
  tt.needsUpdate = true;
  material.map = tt;
};

window.onload = function(){
  document.body.appendChild(renderer.domElement);

  renderer.render(scene,camera);

  texture.onUpdate = function(){
    renderer.render(scene,camera);
  };

  // 回転と移動のアニメーション
  setInterval(function(){
    var time = Date.now()*0.5;
    mesh.rotation.x += 0.02;
    mesh.rotation.y -= 0.01;
    mesh.position.y += 0.02;
    mesh.position.z += (Math.floor(Math.random()*40))*Math.sin(time*Math.PI/180);

    for(var i=0; i<cs.length; i++){
      var m = cs[i];
      m.rotation.x += 0.02;
      m.rotation.y -= 0.01;
      m.position.y += 0.02;
      m.position.z  += (Math.floor(Math.random()*40))*Math.sin(time*Math.PI/180);
    }

    renderer.render(scene,camera);
  }, 1000/60);

  //feedback
  setInterval(function(){
    feedback();
  }, 3000);
};