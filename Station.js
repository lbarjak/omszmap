export default class Station {

    constructor() {
        //this.draw()
    }

    draw = () => {
        //...
        this.text()
        this.drawStation()
    }

    isPointInStation = (pointerX, pointerY) => {
        let inside = false
        inside = this.station.inside(pointerX, pointerY)
        if (inside) return true
        return false
    }

    drawStation = () => {
        let x
        let y
        this.station = this.drawing.circle()
        this.station.data('sn', this.sn)
    }

    text = () => {
        //...
    }
}