window.onload = function(){
    let root = document.getElementById("root");
    let canvas = document.getElementById("render") as HTMLCanvasElement;
    let ctx = canvas.getContext("2d");
    let isDown = false;
    root.onmousedown = (ev)=>{
        isDown = true;
        console.log(` down ${ev.clientX - Math.floor(root.getBoundingClientRect().left)},${ev.clientY- Math.floor(root.getBoundingClientRect().top)}`)
    }
    root.onmousemove = function(ev){
        if(isDown){
            ctx.fillStyle = "#ffffaa"
            ctx.fillRect(0,0,500,300);
            console.log(`${ev.clientX - Math.floor(root.getBoundingClientRect().left)},${ev.clientY- Math.floor(root.getBoundingClientRect().top)}`)
        }
    }
    root.onmouseup = (ev)=>{
        isDown = false;
        console.log(` up ${ev.clientX - Math.floor(root.getBoundingClientRect().left)},${ev.clientY- Math.floor(root.getBoundingClientRect().top)}`)
    }
}