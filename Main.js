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

        this.stations = []

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
        let keys = Object.keys(data)
        let value
        for (let key of keys) {
            value = data[key]
            console.log(key + " " + value[0] + " " + (value[1] - Lat0) + " " + (value[2] - Long0))
        }
        let stationParams = {
            Lat: 0,
            Long: 0,
            name: 0,
            sn: 0,
        }
        this.stations[stationParams.sn] = new Station(
            stationParams,
            this.drawing
        )
    }

    map() {
        let mapHeight
        let mapWidth
        let ratioSvg = this.width / this.height
        const ratioHu = 1.625
        let x = 0
        let y = 0
        if (ratioSvg >= ratioHu) {
            mapHeight = this.height
            mapWidth = mapHeight * ratioHu
            x = (this.width - mapWidth) / 2
        } else {
            mapWidth = this.width
            mapHeight = mapWidth / ratioHu
            y = (this.height - mapHeight) / 2
        }

        let map = this.drawing.image('./HU_counties_blank.svg').size(mapWidth, mapHeight).x(x).y(y)
        map.opacity(0.4)
    }
}