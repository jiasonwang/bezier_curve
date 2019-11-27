import { Position } from "./model";
import Render from "./render";
window.onload = function () {
    let root = document.getElementById("root");
    let bezier = document.getElementById('bezire') as HTMLInputElement;
    let canvas = document.getElementById("render") as HTMLCanvasElement;
    let distance = document.getElementById("distance") as HTMLInputElement;
    let clean = document.getElementById("clean") as HTMLButtonElement;
 
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
    let ps: Array<Position> = [];
    let render = new Render(ctx, canvas.width, canvas.height);
    clean.onclick = ()=>{
        render.clean();
    }
    root.onmousedown = (ev) => {
        isDown = true;
        let x = ev.clientX - Math.floor(root.getBoundingClientRect().left);
        let y = ev.clientY - Math.floor(root.getBoundingClientRect().top);
        console.log(` down ${x},${y}`);
        let p = new Position(x, y);
        ps.push(p);
        render.prepare(distance.valueAsNumber);
        render.renderPointsLine(p,bezier.checked);
    }
    root.onmousemove = function (ev) {
        if (isDown) {
            let x = ev.clientX - Math.floor(root.getBoundingClientRect().left);
            let y = ev.clientY - Math.floor(root.getBoundingClientRect().top);
            console.log(` down ${x},${y}`)
            let p = new Position(x, y);
            ps.push(p);
            render.renderPointsLine(p,bezier.checked);
            // ctx.fillStyle = "#ffffaa"
            // ctx.fillRect(0,0,500,300);
            // console.log(`${ev.clientX - Math.floor(root.getBoundingClientRect().left)},${ev.clientY- Math.floor(root.getBoundingClientRect().top)}`)
        }
    }
    root.onmouseup = (ev) => {
        isDown = false;
        console.log(` up ${ev.clientX - Math.floor(root.getBoundingClientRect().left)},${ev.clientY - Math.floor(root.getBoundingClientRect().top)}`)
        ps = [];
        render.finish();
    }
}