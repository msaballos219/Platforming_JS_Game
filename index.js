    // select the canvas element
const canvas = document.querySelector('canvas')
    // get context
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576


c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)