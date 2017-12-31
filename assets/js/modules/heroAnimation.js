const heroTitle = document.querySelector('.hero h1')

export default function (scrollPosition) {
  if (heroTitle) {
    heroTitle.style.transform = `scale(${1 - (scrollPosition * 0.001)})`
    if (scrollPosition > 920) {
      heroTitle.style.opacity = 0
    } else {
      heroTitle.style.opacity = 1
    }
  }
}
