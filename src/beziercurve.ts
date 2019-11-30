import { Position } from "./model"
import { Render3 } from "./render3"
import Render from "./render";
window.onload = () => {
    let root = document.getElementById("root");
    let savePoints = document.getElementById('save') as HTMLInputElement;
    let canvas = document.getElementById("render") as HTMLCanvasElement;
    let beginRender = document.getElementById('startRender') as HTMLButtonElement;
    let distance = document.getElementById("distance") as HTMLInputElement;
    let clean = document.getElementById('clean') as HTMLButtonElement;
    console.log("width,height" + canvas.width + canvas.height);
    let ctx = canvas.getContext("2d");
    let width = canvas.width, height = canvas.height;
    if (window.devicePixelRatio) {
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        canvas.height = height * window.devicePixelRatio;
        canvas.width = width * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
    let isDown = false;
    let ps: Array<Position>;
    let render = new Render(ctx, canvas.width, canvas.height);
    clean.onclick = (e) => {
        e.preventDefault();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ps = null;
    }

    root.onmousedown = (ev) => {
        ev.preventDefault();
        isDown = true;
        let x = ev.clientX - Math.floor(root.getBoundingClientRect().left);
        let y = ev.clientY - Math.floor(root.getBoundingClientRect().top);
        console.log(` down ${x},${y}`);
        let p = new Position(x, y);
        // ps.push(p);
        if (savePoints.checked) {
            render.prepare(distance.valueAsNumber);
            render.renderPointsLine(p);
        }
    }
    root.onmousemove = function (ev) {
        ev.preventDefault();
        if (isDown) {
            let x = ev.clientX - Math.floor(root.getBoundingClientRect().left);
            let y = ev.clientY - Math.floor(root.getBoundingClientRect().top);
            console.log(` down ${x},${y}`)
            let p = new Position(x, y);
            if (savePoints.checked) {
                render.renderPointsLine(p);
            }
        }
    }
    root.onmouseup = (ev) => {
        ev.preventDefault()
        isDown = false;
        console.log(` up ${ev.clientX - Math.floor(root.getBoundingClientRect().left)},${ev.clientY - Math.floor(root.getBoundingClientRect().top)}`)
        if (savePoints.checked) {
            ps = render.finish();
        }
    }

    beginRender.onclick = (e) => {
        e.preventDefault();
        if (ps && ps.length > 4) {
            let r3 = new Render3(ctx, canvas.width, canvas.height);
            r3.render(ps);
            r3.renderPoints(ps);
        } else {
            alert("点必须大于等于4个")
        }
    }
}