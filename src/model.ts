export class Position {
    constructor(public x: number, public y: number) { }
    toString() {
        return `{x:${this.x},y:${this.y}}`
    }
    middle(other: Position): Position {
        return new Position((other.x + this.x) / 2, (other.y + this.y) / 2);
    }
    distance(other: Position): number {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
}


export function calculacteCtrlPoints(p0: Position, p1: Position, p2: Position, p3: Position, smooth_value: number): Array<Position> {
    //求点 p1,p2的三次贝塞尔曲线的控制点。

    //1.求控制点
    //1.1 三个中点，构成三条线。后面通过平移这几个点作为控制点
    let mP0 = p0.middle(p1);
    let mP1 = p1.middle(p2);//平移后，这个点分为两个点，选为控制点
    let mP2 = p2.middle(p3);
    //1.2 p0p1,p1p2,p2p3长度
    let Lp0p1 = p0.distance(p1);
    let Lp1p2 = p1.distance(p2);
    let Lp2p3 = p2.distance(p3);
    //1.3 求比例点
    let K0 = Lp0p1 / (Lp0p1 + Lp1p2);
    let K1 = Lp1p2 / (Lp1p2 + Lp2p3);
    //1.4 构建等比例平移基点
    let baseP0 = new Position(mP0.x + (mP1.x - mP0.x) * K0, mP0.y + (mP1.y - mP0.y) * K0);
    let baseP1 = new Position(mP1.x + (mP2.x - mP1.x) * K1, mP1.y + (mP2.y - mP1.y) * K1);
    //2. final 控制点
    let ctrlP0 = new Position(p1.x + (mP1.x - baseP0.x) * smooth_value, p1.y + (mP1.y - baseP0.y) * smooth_value);
    let ctrlP1 = new Position(p2.x + (mP1.x - baseP1.x) * smooth_value, p2.y + (mP1.y - baseP1.y) * smooth_value);
    return [ctrlP0, ctrlP1];
}