const canvas = document.getElementById("mi-canvas");
const ctx=canvas.getContext("2d");
const contador = document.getElementById("contador");
const usuario = document.getElementById("usuario");
const aceptar = document.getElementById("aceptar");
const con_usuario = document.getElementById("con_usuario");
let intervalo = 0;
let ganar = 0;
let hrs = 0;
let min = 0;
let seg = 0;  
let coli=0;
let vidas= 4;  
let pierde=0;

const lago = new Image();
lago.src = "./statics/img/lago.png";

const obstaculos = new Image();
obstaculos.src = "./statics/img/objetos.png";

const pantalla_pierde = new Image();
pantalla_pierde.src = "./statics/img/muerte.png";

const pantalla_gana = new Image();
pantalla_gana.src = "./statics/img/victoria.png";

function colision(x1, y1, w1, h1, x2, y2, w2, h2) {
    if(x1 >= x2+w2 || x1+w1 <= x2 || y1 >= y2+h2 || y1+h1 <= y2)
        coli=0;
    else
        coli=1;

    return coli;
}

//cookies 
// if (ganar == 0) {
//     let día = new Date();
// día.setTime(día.getTime() + (3 * 24 * 60 * 1000));
// var cookievalue = "BEPC";
// document.cookie = "Nombre=" + encodeURIComponent( cookievalue ) + "; expires=" + día.toUTCString()+ ";path= /;";

// cookievalue = 0;
// document.cookie = "puntuación=" + encodeURIComponent( cookievalue ) + "; expires=" + día.toUTCString() + ";path= /;";
// }

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

    sprites (){
        if(this.spriteX==47){
            ctx.drawImage(this.img, this.spriteX, this.spriteY, this.anchoSprite, this.altoSprite, this.x, this.y, this.anchoCanvas, this.altoCanvas);
            // this.spriteX = 250;
        }
        if(this.spriteX == 250){
            // ctx.drawImage(tortuga1.img, tortuga1.spriteX, 12, 103, 156, this.x, this.y, 30, 45);
            ctx.drawImage(this.img, this.spriteX, this.spriteY, this.anchoSprite, this.altoSprite, this.x, this.y, this.anchoCanvas, this.altoCanvas);
            // this.spriteX = 47;
        }
        
    }

}

const slime = new Objetito(6, 28, 80, 40, 20, 495, 80, 30, 3, 5, "./statics/img/objetos.png");
const morada = new Objetito(89, 15, 100, 60, 30, 445, 80, 25, 5, 10, "./statics/img/objetos.png");
const tronco = new Objetito(6, 72, 87, 50, 290, 390, 80, 45, 5, 5, "./statics/img/objetos.png");
const gato = new Objetito(108, 81, 70, 40, 700, 340, 80, 50, 7, 7, "./statics/img/objetos.png");
const coete = new Objetito(6, 143, 100, 42, 400, 290, 90, 45, 8, 8, "./statics/img/objetos.png");
const pez = new Objetito(113, 129, 62, 57, 600, 220, 70, 65, 10, 10, "./statics/img/objetos.png");
let tortuga1 = new Objetito(47, 12, 103, 156, 330, 585, 40, 55, 0, 0, "./statics/img/tortuga1.png");
// const tortuga2 = new Objetito(47, 12, 103, 156, 330, 585, 40, 55, 0, 0, "./statics/img/tortuga2.png");
// const tortuga3 = new Objetito(47, 12, 103, 156, 330, 585, 40, 55, 0, 0, "./statics/img/tortuga3.png");
// const tortuga4 = new Objetito(47, 12, 103, 156, 330, 585, 40, 55, 0, 0, "./statics/img/tortuga4.png");

let mov=15;
let jugar = 0;
let sprite = 0;

function fondo(){
    ctx.drawImage(lago, 0,0, 720, 630);

    if(jugar==0){
        ctx.strokeStyle="#ffffff";
        ctx.font = "100px sans-serif"
        ctx.strokeText("TurtleCross", canvas.width/2, canvas.height/7*3);
        ctx.font = "50px sans-serif"
        ctx.strokeText("Presiona enter para jugar", canvas.width/2, canvas.height/5*3);
        ctx.font = "30px sans-serif"
        ctx.fillStyle="#ffffff";
        ctx.fillText("Presiona enter para pausar", canvas.width/2, canvas.height/4*3);
        ctx.textAlign = "center";
    }

    if(pierde == 1){
        ctx.drawImage(pantalla_pierde, 0,0, 720, 630);
    }

    if(jugar == 1){
        contador.parentElement.style.display = "block";
        ctx.strokeStyle="#ffffff";
        ctx.font = "20px sans-serif"
        ctx.strokeText("Contador.- ", canvas.width/2 - 30, canvas.height/7);
        slime.mover();
        morada.mover();
        tronco.mover();
        gato.mover();
        coete.mover();
        pez.mover();
        tortuga1.sprites();
        // tortuga2.sprites();
        // tortuga3.sprites();
        // tortuga4.sprites();

        if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, slime.x, slime.y, slime.altoSprite, slime.altoCanvas) || 
           colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, morada.x, morada.y, morada.altoSprite, morada.altoCanvas) || 
           colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, tronco.x, tronco.y, tronco.altoSprite, tronco.altoCanvas) || 
           colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, gato.x, gato.y, gato.altoSprite, gato.altoCanvas) || 
           colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, coete.x, coete.y, coete.altoSprite, coete.altoCanvas) || 
           colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, pez.x, pez.y, pez.altoSprite, pez.altoCanvas)
           ){
            tortuga1.x=300;
            tortuga1.y=570;
            vidas--;
            console.log("colisión "," vidarestante: ", vidas);

            if(vidas == 3){
                tortuga1.img.src ="statics/img/tortuga2.png";
                console.log("entras?nomanches");
            } else if(vidas == 2){
                tortuga1.img.src ="statics/img/tortuga3.png";
                console.log("entras?nomanches");
            } else if(vidas == 1){
                tortuga1.img.src ="statics/img/tortuga4.png";
                console.log("entras?nomanches");
            }

        }      

        if(vidas == 0){
            pierde = 1;
            jugar = 0;
            vidas = 4;
            tortuga1.img.src ="statics/img/tortuga1.png";
            tortuga1.x=300;
            tortuga1.y=570;
            parar();
            contador.parentElement.style.display = "none";
        }

    }
    window.requestAnimationFrame(fondo);
}
window.requestAnimationFrame(fondo);





document.addEventListener('keydown', (event) => {
    
    var tecla = event.key;
    if(tecla =='Enter' && jugar == 0){
        jugar = 1;
        // ganar = 1;
        // if (ganar == 1) {
        //     con_usuario.style.display = "block";
        //     aceptar.addEventListener("click",()=>{
        //         cookievalue = usuario.value;
        //         con_usuario.style.display = "none";
        //     });
        //     document.cookie = "puntuación=" + encodeURIComponent( cookievalue );
        //     cookievalue = contador.value;
        //     document.cookie = "puntuación=" + encodeURIComponent( cookievalue );
        // }
        // reiniciar();
        cronometrar();
    } else if( jugar ==1 && tecla == 'Enter'){
        jugar = 0;
        parar();
        contador.parentElement.style.display = "none";
    }
    
    if (jugar == 1){
        switch (tecla){
            case 'ArrowUp': 
                //console.log(tecla);
                if(tortuga1.y>135)         //no deja que se salga del canvas
                    tortuga1.y-=mov;
                //console.log(tortuga1.y);
                if(tortuga1.spriteX == 47){
                    tortuga1.spriteX = 250;
                } else if(tortuga1.spriteX == 250){
                    tortuga1.spriteX = 47;
                }
                break;
    
            case 'ArrowDown':
                //console.log(tecla);
                if(tortuga1.y<585)       //no deja que se salga del canvas
                    tortuga1.y+=mov;
                //console.log(tortuga1.y);
                if(tortuga1.spriteX == 47){
                    tortuga1.spriteX = 250;
                } else if(tortuga1.spriteX == 250){
                    tortuga1.spriteX = 47;
                }
                break;
    
            case 'ArrowRight':
                //console.log(tecla);
                if(tortuga1.x<675)      //no deja que se salga del canvas
                    tortuga1.x+=mov;
                //console.log(tortuga1.x);
                if(tortuga1.spriteX == 47){
                    tortuga1.spriteX = 250;
                } else if(tortuga1.spriteX == 250){
                    tortuga1.spriteX = 47;
                }
                break;
    
            case 'ArrowLeft':
                //console.log(tecla);
                if(tortuga1.x>0)         //no deja que se salga del canvas
                    tortuga1.x-=mov;
                //console.log(tortuga1.x);
                if(tortuga1.spriteX == 47){
                    tortuga1.spriteX = 250;
                } else if(tortuga1.spriteX == 250){
                    tortuga1.spriteX = 47;
                }
                break;
    
            default:
                //console.log("Esa tecla no vale");
        }
    }
    
    
    // tortuga1.ruta=

});
//Cronometro, inciar, parar y terminar
function cronometrar(){
    //escribir();
    intervalo = setInterval(escribir,1000);
}

function escribir(){
    var hrs_aux, min_aux, seg_aux;
    seg++;
    if (seg>59){
        min++;seg=0;
    }
    if (min>59){
        hrs++;min=0;
    }
    if (hrs>24){
        hrs=0;
    }

    if (seg<10){
        seg_aux="0"+seg;
    }else{
        seg_aux=seg;
    }
    if (min<10){
        min_aux="0"+min;
    }else{
        min_aux=min;
    }
    if (hrs<10){
        hrs_aux="0"+hrs;
    }else{
        hrs_aux=hrs;
    }

    contador.innerHTML = hrs_aux + ":" + min_aux + ":" + seg_aux; 
}

function reiniciar(){
    clearInterval(intervalo);
    contador.innerHTML="00:00:00";
    hrs=0;min=0;seg=0;
}

function parar(){
clearInterval(intervalo);
}

