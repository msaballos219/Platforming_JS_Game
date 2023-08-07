// Select canvas element and get its context
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

// Set canvas dimensions
canvas.width = 1024
canvas.height = 576

// Define a smaller virtual canvas that will be scaled up
const scaledCanvas = {
    width: canvas.width / 4,
    height: canvas.height / 4
}

// Define a constant for gravity
const gravity = 0.5

// Sprite class for rendering images
class Sprite {
    constructor({position, imageSrc}) {
        this.position = position  // set sprite position
        this.image = new Image()  // create new image object
        this.image.src = imageSrc  // load image
    }

    // Draw sprite
    draw() {
        if (!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    // Update sprite (currently only draws)
    update() {
        this.draw()
    }
}

// Player class
class Player {
    constructor(position) {
        this.position = position  // set player position
        this.velocity = {
          x: 0,
          y: 1  
        }
        this.height = 100  // set player height
    }

    // Draw player as a red rectangle
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    // Update player position based on velocity
    // and apply gravity
    update() {
        this.draw()
        this.position.y += this.velocity.y
        this.position.x += this.velocity.x
        if (this.position.y + this.height + this.velocity.y < canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

// Create two players
const player = new Player({
    x: 0,
    y: 0
})
const player2 = new Player({
    x:300,
    y:100
})

// Object to keep track of key states
const keys = {
    d: {
        pressed: false,
    },
    a: {
        pressed: false,
    },
}

// Create a background sprite
const background = new Sprite({
    position: {
        x:0,
        y:0
    },
    imageSrc: './img/background.png'
})

// Main animation loop
function animate() {
    window.requestAnimationFrame(animate)  // request next animation frame
    c.fillStyle = 'white'  
    c.fillRect(0, 0, canvas.width, canvas.height)  // clear the canvas

    // Draw the background
    c.save()
    c.scale(4, 4)
    c.translate(0, -background.image.height + scaledCanvas.height)
    background.update()
    c.restore()

    // Update players
    player.update()
    player2.update()

    // Handle horizontal movement based on key states
    player.velocity.x = 0
    if (keys.d.pressed) player.velocity.x = 1
    else if (keys.a.pressed) player.velocity.x = -1
}

// Start the animation
animate()

// Event listeners for key down and up events to update key states
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 'w':
            player.velocity.y = -20  // jump
            break
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
    }
})
