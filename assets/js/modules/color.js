import ColorPicker from 'simple-color-picker'
const colorPicker = new ColorPicker({
  color: '#259c71',
  background: '#454545',
  width: 500,
  height: window.innerHeight
});
const colorWrapper = document.querySelector('#color-picker')

function invertColor(hex) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    } else if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    } else if (hex.length !== 6) {
      throw new Error('Invalid HEX color.');
    }
    var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
    return '#' + padZero(r) + padZero(g) + padZero(b);
}

function padZero(str, len) {
    len = len || 2;
    var zeros = new Array(len).join('0');
    return (zeros + str).slice(-len);
}

export default function colors() {
  colorPicker.appendTo(colorWrapper)
  colorPicker.onChange(function(hexStringColor) {
    const compliment = invertColor(hexStringColor)
    const gradientSelector = document.querySelector('.lockup')
    const gradientBg = `linear-gradient(10deg, rgba(0,0,0,0), ${compliment})`
    const projects = document.querySelectorAll('.overlay')
    document.body.setAttribute('style', `background: ${hexStringColor};` )
    gradientSelector.setAttribute('style', `background: ${gradientBg};` )
    for(var i = 0; i < projects.length; i++) {
      projects[i].setAttribute('style', `background: ${compliment};`)
    }
  })
}
