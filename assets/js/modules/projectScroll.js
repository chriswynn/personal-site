const projectWrapper = document.querySelectorAll('.project-wrapper')
const project = document.querySelectorAll('.project')
const projectTitle = document.querySelector('.projects h1')

const projectBlockAnimation = (scrollPos) => {
  let fifthViewport = (window.innerHeight * 0.15)

  if (projectTitle) {
    let titleY = projectTitle.getBoundingClientRect().y
    if (titleY <= fifthViewport) {
      projectTitle.classList.add('project-sticky')
      projectTitle.style.opacity = '0'
    } else {
      projectTitle.classList.remove('project-sticky')
      projectTitle.style.opacity = '1'
    }
  }

  if (projectWrapper) {
    for (let i = 0; i < projectWrapper.length; i++) {
      let projectY = projectWrapper[i].getBoundingClientRect().y
      if (projectY <= fifthViewport) {
        projectWrapper[i].classList.add('project-sticky')
        project[i].classList.add('project-fly-back')
        project[i].classList.remove('project-fly-forward')
      } else {
        projectWrapper[i].classList.remove('project-sticky')
        project[i].classList.add('project-fly-forward')
        project[i].classList.remove('project-fly-back')
      }
    }
  }
}

export default function (scrollPosition) {
  projectBlockAnimation(scrollPosition)
}
