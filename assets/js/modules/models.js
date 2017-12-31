import * as THREE from 'three'
import GetRandomInt from './helpers/getRandomInt'
import HeroAnimation from './heroAnimation'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer()

const bLow = -300
const bHigh = 300

let latestScrollY = 0
let ticking = false

function generateCanvas () {
  renderer.setSize(window.innerWidth, window.innerHeight)
  scene.background = new THREE.Color(0x0c1969)
  document.body.appendChild(renderer.domElement)
  camera.position.z = latestScrollY
  generateModels(100)
}

function generateLights () {
  const light = new THREE.AmbientLight(0xFFFFFF)
  scene.add(light)

  const directionalLight = new THREE.DirectionalLight(0x0085ff, 5)
  directionalLight.position.set(50, 100, 0)
}

function generateModels (modelThreshold) {
  for (let i = 0; i <= modelThreshold; i++) {
    let randomColor = '#' + (Math.random() * 0xFFFFFF<<0).toString(16)
    if (i < modelThreshold / 2) {
      let geometry = new THREE.SphereGeometry(20, 20, 20)
      let material = new THREE.MeshPhongMaterial({color: randomColor})
      let sphere = new THREE.Mesh(geometry, material)
      sphere.translateX(GetRandomInt(bLow, bHigh))
      sphere.translateY(GetRandomInt(bLow, bHigh))
      sphere.translateZ(GetRandomInt(bLow, bHigh))
      scene.add(sphere)
    } else if (i >= (modelThreshold / 2) && i < modelThreshold) {
      let geometry = new THREE.TorusGeometry(10, 3, 16, 100)
      let material = new THREE.MeshPhongMaterial({color: randomColor})
      let torus = new THREE.Mesh(geometry, material)
      torus.translateX(GetRandomInt(bLow, bHigh))
      torus.translateY(GetRandomInt(bLow, bHigh))
      torus.translateZ(GetRandomInt(bLow, bHigh))
      torus.rotateX(GetRandomInt(0, 3.14159))
      torus.rotateY(GetRandomInt(0, 3.14159))
      scene.add(torus)
    }
  }

  generateLights()
  renderer.render(scene, camera)
}

function onScroll () {
  latestScrollY = window.scrollY
  requestTick()
}

function requestTick () {
  if (!ticking) {
    requestAnimationFrame(animate)
  }
  ticking = true
}

function animate () {
  ticking = false
  let currentScrollY = latestScrollY
  camera.position.z = currentScrollY / 4
  HeroAnimation(currentScrollY)
  renderer.render(scene, camera)
}

export default function () {
  generateCanvas()
  window.addEventListener('scroll', onScroll)
}
