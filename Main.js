import Stations from './Stations.js'
let stations = new Stations().stations
console.log(Stations.proba)

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

        this.main()
        this.map()
    }

    reload = () => {
        fetch('', {
            'Cache-Control': 'no-cache'
        })
            .then(() => location.reload())
            .catch((error) => console.warn(error))
    }

    main() {
        let Lan0 = 45.8
        let Lon0 = 16.083333
        let keys = Object.keys(stations)
        let value
        for (let key of keys) {
            value = stations[key]
            console.log(key + " " + value[0] + " " + (value[1] - Lan0) + " " + (value[2] - Lon0))
        }
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