const heroTitle = document.querySelector('.hero h1')

export default function(scrollPosition) {
  heroTitle.style.transform = `scale(${ 1 - (scrollPosition * .001)})`
  if(scrollPosition > 920) {
    heroTitle.style.opacity = 0
  } else {
    heroTitle.style.opacity = 1
  }
}
