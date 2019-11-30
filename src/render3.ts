import { Position, calculacteCtrlPoints } from "./model"
export class Render3 {
    constructor(private ctx: CanvasRenderingContext2D, private width: number, private height: number) {

    }
    render(ps: Array<Position>) {
        let p0: Position = null;
        let p1: Position = null;
        let p2: Position = null;
        let p3: Position = null;
        let ctrls: Array<Position>;
        this.ctx.strokeStyle = "#4A235A"
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = "round";
        this.ctx.lineJoin = 'round';
        for (let i: number = 0; i < (ps.length - 1); i++) {
            p0 = null;
            p1 = ps[i];
            p2 = ps[i + 1];
            p3 = null;
            if (i == 0) {
                p0 = ps[0];
            } else {
                p0 = ps[i - 1];
            }
            if (i == ps.length - 2) {
                p3 = ps[ps.length - 1];
            } else {
                p3 = ps[i + 2];
            }

            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            ctrls = calculacteCtrlPoints(p0, p1, p2, p3, 0.7);
            this.ctx.bezierCurveTo(ctrls[0].x, ctrls[0].y, ctrls[1].x, ctrls[1].y, p2.x, p2.y);
            this.ctx.stroke();
        }
        this.ctx.closePath()
    }
    renderPoints(ps: Array<Position>) {
        this.ctx.fillStyle = "#9A7D0A"
        ps.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            this.ctx.fill();
            this.ctx.closePath()
        })
    }
}
