import Data from './Data.js'
import Station from './Station.js'
let data = new Data().data

export default class Main {

    constructor() {
        window.onresize = this.reload
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.drawing = SVG()
            .addTo('#svgs')
            .size(this.width, this.height)
        this.rect = this.drawing
            .rect(this.width, this.height)
            .attr({ fill: 'lightgray' })

        this.mapHeight
        this.mapWidth
        this.xMap
        this.yMap
        this.stations = {}

        this.map()
        this.drawStations()
        this.events()
    }

    reload = () => {
        fetch('', {
            'Cache-Control': 'no-cache'
        })
            .then(() => location.reload())
            .catch((error) => console.warn(error))
    }

    map() {
        let ratioSvg = this.width / this.height
        const ratioHu = 1.625

        if (ratioSvg >= ratioHu) {
            this.mapHeight = this.height
            this.mapWidth = this.mapHeight * ratioHu
            this.xMap = (this.width - this.mapWidth) / 2
            this.yMap = 0
        } else {
            this.mapWidth = this.width
            this.mapHeight = this.mapWidth / ratioHu
            this.yMap = (this.height - this.mapHeight) / 2
            this.xMap = 0
        }

        let map = this.drawing.image('./HU_counties_blank.svg')
            .size(this.mapWidth, this.mapHeight)
            .x(this.xMap)
            .y(this.yMap)
        map.opacity(0.4)
    }

    drawStations() {
        let Lat0 = 45.8
        let Long0 = 16.083333
        let LatMax = 48.583333
        let LongMax = 22.966667
        let LatSize = LatMax - Lat0
        let LongSize = LongMax - Long0
        let keys = Object.keys(data)
        let value
        let stationParams
        for (let key of keys) {
            value = data[key]
            //console.log(key + " " + value[0] + " " + (value[1] - Lat0) + " " + (value[2] - Long0))

            stationParams = {
                x: this.xMap + this.mapWidth * (value[2] - Long0) / LongSize,
                y: this.mapHeight - (this.mapHeight * (value[1] - Lat0) / LatSize),
                name: value[0],
                sn: key
            }
            console.log(">" + stationParams.y)
            this.stations[stationParams.sn] = new Station(
                stationParams,
                this.drawing
            )
        }
        console.log(this.stations)
    }

    showParams() {
        console.log("Ok")
    }


    events() {
        let isMouseDown
        let currentStationSn

        let inside = (x, y) => {
            return (
                x >= 0 &&
                x < window.innerWidth &&
                y >= 0 &&
                y < window.innerHeight
            )
        }

        let handleMouse = (e) => {

            e.preventDefault()
            if (inside(e.clientX, e.clientY) && e.target.tagName !== 'BODY') {
                currentStationSn = e.target.attributes['data-sn'].value
                console.log(currentStationSn)
            } else {
                isMouseDown = false
            }
            if (e.type === 'mousedown') isMouseDown = true
            if (e.type === 'mouseup' || e.type === 'mouseleave')
                isMouseDown = false
            if (currentStationSn && isMouseDown) {
                this.showParams(true, currentStaionSn)
            }
        }

        document.addEventListener('mouseleave', handleMouse)

        for (let station of Object.entries(this.stations)) {
            console.log(station)
            //this.stations.forEach((station) => {
            station[1].circle.on(['mousedown', 'mouseup'], handleMouse, false)
        }
    }
}