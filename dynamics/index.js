const canvas = document.getElementById("mi-canvas");
const ctx=canvas.getContext("2d");

const lago = new Image();
lago.src = "./statics/img/lago.png";

const obstaculos = new Image();
obstaculos.src = "./statics/img/objetos.png";

// const tortuga1 = new Image();
// tortuga1.src = "./statics/img/tortuga1.png";

class Objetito {
    constructor(spriteX, spriteY, anchoSprite, altoSprite, x, y, anchoCanvas, altoCanvas, dx, dy, ruta){
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.anchoSprite = anchoSprite;
        this.altoSprite = altoSprite;
        this.anchoCanvas = anchoCanvas;
        this.altoCanvas = altoCanvas;
        const imagen = new Image();
        imagen.src = ruta;
        this.img = imagen;
        // "statics/img/dvd.png"
    
    }

    mover (){
        ctx.drawImage(this.img, this.spriteX, this.spriteY, this.anchoSprite, this.altoSprite, this.x, this.y, this.anchoCanvas, this.altoCanvas);
        this.x+=this.dx;
        if(this.x<=-80 || this.x>= canvas.width)
            this.x = -80;
    }

}

const slime = new Objetito(6, 28, 80, 40, 20, 495, 80, 40, 5, 5, "./statics/img/objetos.png");
const morada = new Objetito(89, 15, 100, 60, 30, 445, 80, 45, 10, 10, "./statics/img/objetos.png");
const tronco = new Objetito(6, 72, 87, 50, 290, 390, 80, 45, 5, 5, "./statics/img/objetos.png");
const gato = new Objetito(108, 81, 70, 40, 700, 340, 80, 50, 7, 7, "./statics/img/objetos.png");
const coete = new Objetito(6, 143, 100, 42, 400, 290, 90, 45, 3, 3, "./statics/img/objetos.png");
const pez = new Objetito(113, 129, 62, 57, 600, 220, 70, 65, 10, 10, "./statics/img/objetos.png");
const tortuga1 = new Objetito(35, 7, 145, 161, 330, 585, 30, 20, 0, 0, "./statics/img/tortuga1.png");

function fondo(){
    ctx.drawImage(lago, 0,0, 720, 630);

    slime.mover();
    morada.mover();
    tronco.mover();
    gato.mover();
    coete.mover();
    pez.mover();
    ctx.drawImage(tortuga1.img, 35, 7, 145, 161, tortuga1.x, tortuga1.y, 50, 50);
    window.requestAnimationFrame(fondo);
}
window.requestAnimationFrame(fondo);



let mov=15;
let jugar = 0;

document.addEventListener('keydown', (event) => {
    
    var tecla = event.key;
    if(tecla =='Enter' && jugar == 0){
        jugar = 1;
    } else if( jugar ==1 && tecla == 'Enter'){
        jugar = 0;
    }

    
    if (jugar == 1){
        switch (tecla){
            case 'ArrowUp': 
                console.log(tecla);
                if(tortuga1.y>135)         //no deja que se salga del canvas
                    tortuga1.y-=mov;
                console.log(tortuga1.y);
                break;
    
            case 'ArrowDown':
                console.log(tecla);
                if(tortuga1.y<585)       //no deja que se salga del canvas
                    tortuga1.y+=mov;
                console.log(tortuga1.y);
                break;
    
            case 'ArrowRight':
                console.log(tecla);
                if(tortuga1.x<675)      //no deja que se salga del canvas
                    tortuga1.x+=mov;
                console.log(tortuga1.x);
                break;
    
            case 'ArrowLeft':
                console.log(tecla);
                if(tortuga1.x>0)         //no deja que se salga del canvas
                    tortuga1.x-=mov;
                console.log(tortuga1.x);
                break;
    
            default:
                console.log("Esa tecla no vale")
        }
    }
    
    

});


