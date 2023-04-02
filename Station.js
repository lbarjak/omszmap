export default class Station {

    constructor(stationParams, drawing) {
        this.x = stationParams.x
        this.y = stationParams.y
        this.sn = stationParams.sn
        this.name = stationParams.name
        this.drawing = drawing
        this.circle
        this.draw()
    }

    draw = () => {
        this.drawCircle()
        this.text()
    }

    isPointInStation = (pointerX, pointerY) => {
        let inside = false
        inside = this.station.inside(pointerX, pointerY)
        if (inside) return true
        return false
    }

    drawCircle = () => {
        this.circle = this.drawing.circle(10).move(this.x, this.y)
        this.circle.attr({
            stroke: 'red',
            'stroke-width': 2,
            'fill': 'red'
        })
        this.circle.data('sn', this.sn)
    }

    text = () => {
        //...
    }
}