const canvas = document.getElementById("mi-canvas");
const ctx=canvas.getContext("2d");
const contador = document.getElementById("contador");
const usuario = document.getElementById("usuario");
const aceptar = document.getElementById("aceptar");
const con_usuario = document.getElementById("con_usuario");
const noVidas = document.getElementById("noVidas");
const contenedor_lirios = document.getElementById("contenedor_lirios");
const lirio11 = document.getElementById("lirio11");
const lirio22 = document.getElementById("lirio22");
const lirio33 = document.getElementById("lirio33");
const lirio44 = document.getElementById("lirio44");
const valor = document.getElementById("puntucion");
const nombre = document.getElementById("nombre");
const boom = new Audio("./statics/media/audio/boom-sound-effect.mp3");
const ring = new Audio("./statics/media/audio/sonic-ring-sound-effect-hd.mp3");
const gameOver = new Audio("./statics/media/audio/undertale-game-over-theme.mp3");
const victory = new Audio("./statics/media/audio/luma-theme-super-mario-galaxy.mp3");

let victoria=0;
let cookies = "0";
let intervalo = 0;
let ganar = 0;
let hrs = 0;
let min = 0;
let seg = 0;  
let coli=0;
let vidas= 4;  
let pierde=0;
let lirio1=0;
let lirio2=0;
let lirio3=0;
let lirio4=0;
let con=0;
let día = new Date();

if (document.cookie == "") {
    día.setTime(día.getTime() + (3 * 24 * 60 * 1000));
    cookievalue = "Default";
    document.cookie = "Nombre=" + encodeURIComponent( cookievalue ) + "; expires=" + día.toUTCString();
    cookievalue = 1000;
    document.cookie = "puntuación=" + encodeURIComponent( cookievalue ) + "; expires=" + día.toUTCString();
}

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
        }
        if(this.spriteX == 250){
            ctx.drawImage(this.img, this.spriteX, this.spriteY, this.anchoSprite, this.altoSprite, this.x, this.y, this.anchoCanvas, this.altoCanvas);
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

let mov=15;
let jugar = 0;
let sprite = 0;

function fondo(){
    ctx.drawImage(lago, 0,0, 720, 630);
    // if(lirio1==1 && colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 105, 135, 10, 10) == 0){
    //     console.log("imprimiendo tortugas");
    //     ctx.drawImage(tortuga1.img, 47, 12, 103, 156, dibujaX, dibujaY, 40, 50);
    //     console.log("imprimiendo tortugas2");
    // }else if(lirio2==1 && colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 105, 135, 10, 10) == 0){
    //     console.log("imprimiendo tortugas");
    //     // ctx.drawImage(tortuga1.img, 47, 12, 103, 156, tortuga1.x, tortuga1.y, 40, 55);
    // }else if(lirio3==1 && colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 105, 135, 10, 10) == 0){
    //     // ctx.drawImage(tortuga1.img, 47, 12, 103, 156, tortuga1.x, tortuga1.y, 40, 55);
    // }else if(lirio4==1 && colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 105, 135, 10, 10) == 0){
    //     // ctx.drawImage(tortuga1.img, 47, 12, 103, 156, tortuga1.x, tortuga1.y, 40, 55);
    // }

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

    if(victoria==1){
        victory.volume = 0.5;
        victory.play();
        ctx.drawImage(pantalla_gana, 0,0, 720, 630);
        contador.parentElement.style.display = "none";
        noVidas.parentElement.style.display = "none";
        aceptar.addEventListener("click",()=>{
            cookievalue = usuario.value;
            con_usuario.style.display = "none";
            var cookievalue = "BEPC"; 
            día.setTime(día.getTime() + (3 * 24 * 60 * 1000));
            cookies = document.cookie.replace(/(?:(?:^|.*;\s*)puntuación\s*\=\s*([^;]*).*$)|^.*$/, "$1");;
            if (con < cookies) {
                cookievalue = usuario.value;
                document.cookie = "Nombre=" + encodeURIComponent( cookievalue ) + "; expires=" + día.toUTCString();
                cookievalue = con;
                document.cookie = "puntuación=" + encodeURIComponent( cookievalue ) + "; expires=" + día.toUTCString();
                cookies = document.cookie.replace(/(?:(?:^|.*;\s*)puntuación\s*\=\s*([^;]*).*$)|^.*$/, "$1");;
                valor.innerHTML = cookies;
                cookies = document.cookie.replace(/(?:(?:^|.*;\s*)Nombre\s*\=\s*([^;]*).*$)|^.*$/, "$1");;
                nombre.innerHTML = cookies;
            }else{}
        });
        
    }

    if(jugar == 1){
        gameOver.pause();
        gameOver.currentTime = 0;
        victory.pause();
        victory.currentTime = 0;
        contador.parentElement.style.display = "block";
        noVidas.parentElement.style.display = "block";
        ctx.strokeStyle="#ffffff";
        ctx.font = "20px sans-serif"
        ctx.strokeText("Vidas: ", canvas.width/2 - 250, canvas.height/7);
        ctx.strokeText("Contador: ", canvas.width/2 - 50, canvas.height/7);
        ctx.strokeText("Récord: ", canvas.width/2 +230, canvas.height/7);
        slime.mover();
        morada.mover();
        tronco.mover();
        gato.mover();
        coete.mover();
        pez.mover();
        tortuga1.sprites();
        noVidas.innerHTML = vidas; 



        // if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, slime.x, slime.y, slime.altoSprite, slime.altoCanvas) || 
        //    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, morada.x, morada.y, morada.altoSprite, morada.altoCanvas) || 
        //    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, tronco.x, tronco.y, tronco.altoSprite, tronco.altoCanvas) || 
        //    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, gato.x, gato.y, gato.altoSprite, gato.altoCanvas) || 
        //    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, coete.x, coete.y, coete.altoSprite, coete.altoCanvas) || 
        //    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, pez.x, pez.y, pez.altoSprite, pez.altoCanvas)
        //    ){
        //     tortuga1.x=300;
        //     tortuga1.y=570;
        //     vidas--;
        //     boom.volume = 0.5;
        //     boom.play();
            
        //     console.log("colisión "," vidarestante: ", vidas);

        //     if(vidas == 3){
        //         tortuga1.img.src ="statics/img/tortuga2.png";
        //         console.log("entras?nomanches");
        //     } else if(vidas == 2){
        //         tortuga1.img.src ="statics/img/tortuga3.png";
        //         console.log("entras?nomanches");
        //     } else if(vidas == 1){
        //         tortuga1.img.src ="statics/img/tortuga4.png";
        //         console.log("entras?nomanches");
        //     }

        // }      

        

        if(vidas == 0){
            pierde = 1;
            jugar = 0;
            ganar=0;
            vidas = 4;
            tortuga1.img.src ="statics/img/tortuga1.png";
            tortuga1.x=300;
            tortuga1.y=570;
            parar();
            lirio1 = 0;
            lirio2 = 0;
            lirio3 = 0;
            lirio4 = 0;
            lirio44.style.display="none";
            lirio33.style.display="none";
            lirio22.style.display="none";
            lirio11.style.display="none";
            contador.parentElement.style.display = "none";
            noVidas.parentElement.style.display = "none";
            gameOver.volume = 0.5;
            gameOver.play();
        }

        

        if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 105, 135, 10, 10) == 1 && lirio1==0){
            ganar+=1;
            console.log(ganar);
            lirio1=1;
            dibujaX = tortuga1.x;
            dibujaY = tortuga1.Y;
            ring.volume = 0.5;
            ring.play();
            // ctx.drawImage(tortuga1.img, 47, 12, 103, 156, tortuga1.x, tortuga1.y, 40, 55);
            // contenedor_lirios.innerHTML = '<div id="lirio11">X</div>;'
            lirio11.style.display="block";

            if(ganar == 1){
                tortuga1.img.src ="statics/img/tortuga2.png";
                console.log("entras?nomanches");
            } else if(ganar == 2){
                tortuga1.img.src ="statics/img/tortuga3.png";
                console.log("entras?nomanches");
            } else if(ganar == 3){
                tortuga1.img.src ="statics/img/tortuga4.png";
                console.log("entras?nomanches");
            }
            tortuga1.x=300;
            tortuga1.y=570;
        }else if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 300, 135, 10, 10) == 1 && lirio2==0){
            ganar+=1;
            console.log(ganar);
            lirio2=1;
            ring.volume = 0.5;
            ring.play();
            // contenedor_lirios.innerHTML = '<div id="lirio22">X</div>;'
            lirio22.style.display="block";
            
            // ctx.drawImage(tortuga1.img, 47, 12, 103, 156, tortuga1.x, tortuga1.y, 40, 55);
            if(ganar == 1){
                tortuga1.img.src ="statics/img/tortuga2.png";
                console.log("entras?nomanches");
            } else if(ganar == 2){
                tortuga1.img.src ="statics/img/tortuga3.png";
                console.log("entras?nomanches");
            } else if(ganar == 3){
                tortuga1.img.src ="statics/img/tortuga4.png";
                console.log("entras?nomanches");
            }
            tortuga1.x=300;
            tortuga1.y=570;
        }else if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 585, 135, 10, 10) == 1 && lirio3==0){
            ganar+=1;
            console.log(ganar);
            lirio3=1;
            ring.volume = 0.5;
            ring.play();
            // ctx.drawImage(tortuga1.img, 47, 12, 103, 156, tortuga1.x, tortuga1.y, 40, 55);
            // contenedor_lirios.innerHTML = '<div id="lirio33">X</div>;'
            lirio33.style.display="block";

            if(ganar == 1){
                tortuga1.img.src ="statics/img/tortuga2.png";
                console.log("entras?nomanches");
            } else if(ganar == 2){
                tortuga1.img.src ="statics/img/tortuga3.png";
                console.log("entras?nomanches");
            } else if(ganar == 3){
                tortuga1.img.src ="statics/img/tortuga4.png";
                console.log("entras?nomanches");
            }
            tortuga1.x=300;
            tortuga1.y=570;
        }else if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 540, 135, 10, 10) == 1 && lirio4==0){
            ganar+=1;
            console.log(ganar);
            lirio4=1;
            ring.volume = 0.5;
            ring.play();
            // ctx.drawImage(tortuga1.img, 47, 12, 103, 156, tortuga1.x, tortuga1.y, 40, 55);
            // contenedor_lirios.innerHTML = '<div id="lirio44">X</div>;'
            lirio44.style.display="block";
            if(ganar == 1){
                tortuga1.img.src ="statics/img/tortuga2.png";
                console.log("entras?nomanches");
            } else if(ganar == 2){
                tortuga1.img.src ="statics/img/tortuga3.png";
                console.log("entras?nomanches");
            } else if(ganar == 3){
                tortuga1.img.src ="statics/img/tortuga4.png";
                console.log("entras?nomanches");
            }

            tortuga1.x=300;
            tortuga1.y=570;
        }

        

        if(ganar == 4){
            ganar=0;
            jugar = 0;
            vidas = 4;
            tortuga1.img.src ="statics/img/tortuga1.png";
            tortuga1.x=300;
            tortuga1.y=570;
            parar();
            victoria=1;
            lirio1 = 0;
            lirio2 = 0;
            lirio3 = 0;
            lirio4 = 0;
            lirio44.style.display="none";
            lirio33.style.display="none";
            lirio22.style.display="none";
            lirio11.style.display="none";
            con_usuario.style.display = "block";
        }
    }
    window.requestAnimationFrame(fondo);
}
window.requestAnimationFrame(fondo);





document.addEventListener('keydown', (event) => {
    
    var tecla = event.key;
    if(tecla =='Enter' && jugar == 0){
        jugar = 1;
        if(pierde==1){
            reiniciar();
            pierde=0;
        }

        if(victoria==1){
            reiniciar();
            victoria=0;
        }
        cronometrar();
    } else if( jugar ==1 && tecla == 'Enter'){
        jugar = 0;
        parar();
        contador.parentElement.style.display = "none";
        noVidas.parentElement.style.display = "none";
    }
    
    if (jugar == 1){
        switch (tecla){
            case 'ArrowUp': 
                console.log(tecla);
                if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 0, 135, 90, 80) == 0 &&
                    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 150, 135, 150, 40) == 0 && 
                    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 365, 135, 150, 65) == 0 && 
                    colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 640, 135, 90, 80) == 0){
                    if(tortuga1.y>135)         //no deja que se salga del canvas
                    tortuga1.y-=mov;
                    console.log(tortuga1.y);
                    if(tortuga1.spriteX == 47){
                        tortuga1.spriteX = 250;
                    } else if(tortuga1.spriteX == 250){
                        tortuga1.spriteX = 47;
                    }
                }
                break;
    
            case 'ArrowDown':
                console.log(tecla);
                if(tortuga1.y<585)       //no deja que se salga del canvas
                    tortuga1.y+=mov;
                console.log(tortuga1.y);
                if(tortuga1.spriteX == 47){
                    tortuga1.spriteX = 250;
                } else if(tortuga1.spriteX == 250){
                    tortuga1.spriteX = 47;
                }
                break;
    
            case 'ArrowRight':
                if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 150, 135, 150, 40) == 0 && 
                   colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 365, 135, 150, 65) == 0 && 
                   colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 635, 135, 90, 80) == 0){
                    console.log(tecla);
                    if(tortuga1.x<675)      //no deja que se salga del canvas
                        tortuga1.x+=mov;
                    console.log(tortuga1.x);
                    if(tortuga1.spriteX == 47){
                        tortuga1.spriteX = 250;
                    } else if(tortuga1.spriteX == 250){
                        tortuga1.spriteX = 47;
                    }
                }
                break;
    
            case 'ArrowLeft':
                if(colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 0, 135, 95, 80) == 0 &&
                   colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 155, 135, 150, 40) == 0 && 
                   colision(tortuga1.x, tortuga1.y, tortuga1.anchoCanvas, tortuga1.altoCanvas, 365, 135, 170, 65) == 0){
                    console.log(tecla);
                    if(tortuga1.x>0)         //no deja que se salga del canvas
                        tortuga1.x-=mov;
                    console.log(tortuga1.x);
                    if(tortuga1.spriteX == 47){
                        tortuga1.spriteX = 250;
                    } else if(tortuga1.spriteX == 250){
                        tortuga1.spriteX = 47;
                    }
                }
                break;
    
            default:
                console.log("Esa tecla no vale");
        }
    }
    

});

//Cronometro, inciar, parar y terminar
function cronometrar(){
    //escribir();
    intervalo = setInterval(escribir,1000);
}

function escribir(){
    var hrs_aux, min_aux, seg_aux;
    seg++;
    con++;
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
