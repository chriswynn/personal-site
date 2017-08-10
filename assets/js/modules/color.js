import ColorPicker from 'simple-color-picker'
const colorPicker = new ColorPicker({
  color: '#9c2525',
  background: '#454545',
  width: 500,
  height: window.innerHeight
});
const colorWrapper = document.querySelector('#color-picker')

export default function colors() {
  colorPicker.appendTo(colorWrapper)
  colorPicker.onChange(function(hexStringColor) {
    document.body.style.background = hexStringColor
  })
}
