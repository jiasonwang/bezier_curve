import { Position } from "./model";
export default class Render {
    points: Array<Position>;
    diffDistance: number;
    constructor(private ctx: CanvasRenderingContext2D, private width: number, private height: number) { }
    prepare(distance: number = 1) {
        this.diffDistance = distance;
        // this.ctx.clearRect(0, 0, this.width, this.height);
        this.points = [];
        this.ctx.strokeStyle = "#00CDCD"
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';
    }
    renderPointsLine(point: Position, bezier: boolean = false) {
        if (this.points.length == 0) {
            this.ctx.beginPath();
            this.ctx.moveTo(point.x, point.y);
            this.points.push(point);
        } else {
            let lastPoint = this.points[this.points.length - 1];
            let diffx = Math.abs(lastPoint.x - point.x);
            let diffy = Math.abs(lastPoint.y - point.y);
            if (Math.sqrt(Math.pow(diffx, 2) + Math.pow(diffy, 2)) > this.diffDistance) {
                if (bezier) {
                    let middlePoint = new Position((lastPoint.x + point.x) / 2, (lastPoint.y + point.y) / 2);
                    this.ctx.quadraticCurveTo(lastPoint.x, lastPoint.y, middlePoint.x, middlePoint.y)
                } else {
                    this.ctx.lineTo(point.x, point.y);
                    console.log("draw point" + point.toString());
                }
                this.points.push(point);
                this.ctx.stroke();
            }

        }
    }

    renderQuadBeziercure(points: Array<Position>) {

    }
    finish() {
        this.ctx.closePath();
        this.points = [];
    }
    clean() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}