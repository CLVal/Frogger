const canvas = document.getElementById("mi-canvas");
const ctx=canvas.getContext("2d");

ctx.fillStyle ="#000000";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.fillStyle ="#00ff00";

let x=45;
let y=45;
let mov=45;
ctx.fillRect(x,y, 45,45);

document.addEventListener('keydown', (event) => {
    var tecla = event.key;
    ctx.fillStyle ="#000000";
    ctx.fillRect(0,0, canvas.width, canvas.height);

    switch (tecla){
        case 'ArrowUp': 
            console.log(tecla);
            if(y>0)         //no deja que se salga del canvas
                y-=mov;
            break;

        case 'ArrowDown':
            console.log(tecla);
            if(y<585)       //no deja que se salga del canvas
                y+=mov;
            break;

        case 'ArrowRight':
            console.log(tecla);
            if(x<675)      //no deja que se salga del canvas
                x+=mov;
            console.log(x);
            break;

        case 'ArrowLeft':
            console.log(tecla);
            if(x>0)         //no deja que se salga del canvas
                x-=mov;
            break;

        default:
            console.log("Esa tecla no vale")
    }
    ctx.fillStyle ="#00ff00";
    ctx.fillRect(x,y, 45,45);

});
