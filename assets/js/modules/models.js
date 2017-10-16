var THREE = require('three')

export default function() {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 )
    const renderer = new THREE.WebGLRenderer()
    const modelThreshold = 300

    renderer.setSize( window.innerWidth, window.innerHeight )
    scene.background = new THREE.Color( 0x0c1969 );
    document.body.appendChild( renderer.domElement )

    function getRandomInt(min, max) {
      min = Math.ceil(min)
      max = Math.floor(max)
      return Math.floor(Math.random() * (max - min)) + min
    }

    for(let i = 0; i <= modelThreshold; i++) {
      let randomColor =  '#' + (Math.random()*0xFFFFFF<<0).toString(16);
      if(i < 100) {
        var geometry = new THREE.SphereGeometry( 20, 20, 20 )
        var material = new THREE.MeshPhongMaterial( {color: randomColor} )
        var sphere = new THREE.Mesh( geometry, material )
        sphere.translateX(getRandomInt(-200, 200))
        sphere.translateY(getRandomInt(-200, 200))
        sphere.translateZ(getRandomInt(-200, 200))
        scene.add( sphere )
      } else if(i >= 100 && i < 200) {
        var geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
        var material = new THREE.MeshPhongMaterial( {color: randomColor} )
        var torus = new THREE.Mesh( geometry, material )
        torus.translateX(getRandomInt(-200, 200))
        torus.translateY(getRandomInt(-200, 200))
        torus.translateZ(getRandomInt(-200, 200))
        torus.rotateX(getRandomInt(0, 3.14159))
        torus.rotateY(getRandomInt(0, 3.14159))
        scene.add( torus )
      } 
    }

    var light = new THREE.AmbientLight( 0xf300ff ); // soft white light
    scene.add( light );

    var light = new THREE.AmbientLight( 0x404040 ); // soft white light
    scene.add( light );

    var directionalLight = new THREE.DirectionalLight( 0x0085ff, 3)
    scene.add( directionalLight )

    camera.position.z = window.scrollY

    var animate = function () {
      window.addEventListener('scroll', function() {
        camera.position.z = window.scrollY / 4
      })
      requestAnimationFrame( animate )
      renderer.render(scene, camera)
    };

    animate()
}

