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

        let mapHeight
        let mapWidth
        this.stations = {}

        this.map()
        this.drawStations()
    }

    reload = () => {
        fetch('', {
            'Cache-Control': 'no-cache'
        })
            .then(() => location.reload())
            .catch((error) => console.warn(error))
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
                x: this.mapWidth * (value[2] - Long0) / LongSize,
                y: this.mapHeight * (value[1] - Lat0) / LatSize,
                name: value[0],
                sn: key
            }
            this.stations[stationParams.sn] = new Station(
                stationParams,
                this.drawing
            )
        }
        console.log(this.stations)
    }

    map() {
        let ratioSvg = this.width / this.height
        const ratioHu = 1.625
        let x = 0
        let y = 0
        if (ratioSvg >= ratioHu) {
            this.mapHeight = this.height
            this.mapWidth = this.mapHeight * ratioHu
            x = (this.width - this.mapWidth) / 2
        } else {
            this.mapWidth = this.width
            this.mapHeight = this.mapWidth / ratioHu
            y = (this.height - this.mapHeight) / 2
        }

        let map = this.drawing.image('./HU_counties_blank.svg').size(this.mapWidth, this.mapHeight).x(x).y(y)
        map.opacity(0.4)
    }
}