const canvas = document.getElementById("mi-canvas");
const ctx=canvas.getContext("2d");

ctx.fillStyle ="#000000";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle ="#00ff00";

let x=60;
let y=60;
let mov=60;
ctx.fillRect(x,y, 60,60);

document.addEventListener('keydown', (event) => {
    var tecla = event.key;
    ctx.fillStyle ="#000000";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    switch (tecla){
        case 'ArrowUp': 
            console.log(tecla);
            y-=mov;
            break;

        case 'ArrowDown':
            console.log(tecla);
            y+=mov;
            break;

        case 'ArrowRight':
            console.log(tecla);
            x+=mov;
            break;

        case 'ArrowLeft':
            console.log(tecla);
            x-=mov;
            break;

        default:
            console.log("Esa tecla no vale")
    }
    ctx.fillStyle ="#00ff00";
    ctx.fillRect(x,y, 60,60);

});
