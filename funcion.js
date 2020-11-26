document.addEventListener('keydown', function(evento){
	if (evento.keyCode == 39) {
		if (vida==false) {

		}else{
		console.log("derecha");
		derecha();

		}
	}
	if (evento.keyCode == 37) {
		if (vida==false) {

		}else{
		console.log("izquierda");
		izquierda();

		}
	}

	if (evento.keyCode == 32 && vida==false) {
		vida=true;
		nivel.punto = 0;
		star = true;
		_kartE.y = -500;
		_kartE1.y = -1200;
		_kart.x=180;
		nivel.velocidad = 9;
		nivel.velocidad1 = 9;
		_kart.vx = 14;
		snd.play();
	}
})
//------------------------------VARIABLES------------------------
var ancho = 600;
var alto = 750;
var canvas, ctx;
var star = false;
var vida = false;
//-----------------------------NIVEL----------------
var nivel = {velocidad: 9, punto: 0, velocidad1: 9, hi: 0};
//---------------------------------------------------------------

function cargarImg(){
	car = new Image();
	car_1 = new Image();
	car_enemy = new Image();
	linea = new Image();
	arbol = new Image();
	grama = new Image();
	gm = new Image();

	snd = new Audio("sonido/in.mp3");
	choque = new Audio("sonido/choque.mp3");


	car.src = 'img/car.png';
	car_1.src = 'img/car_1.png';
	car_enemy.src = 'img/car_enemy.png';
	linea.src = 'img/linea.png';
	arbol.src = 'img/arbol.png';
	grama.src = 'img/grama.png';
	gm.src = 'img/gm.png';
}



function init(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	cargarImg();

}

function borrar(){
	canvas.width = ancho;
	canvas.height = alto;
}
/*--------------------------KART------------------------------*/
var _kart = {y: 500, x:180, vx: 14, velocidady: 4,w:186, h:99};

function dibujaCar(){
	ctx.drawImage(car,0,0,_kart.h,_kart.w,_kart.x,_kart.y,99,186);
}



function derecha(){
	_kart.x += _kart.vx;

}

function izquierda(){
	_kart.x -= _kart.vx;
}

//-------------------------SUELO------------------------------
var _linea = {y: 200, x:285};

function dibujaLinea(){
	ctx.drawImage(linea,0,_linea.y,30,850,_linea.x,0,30,850)
}

function movimientoL(){
	if (_linea.y < 0) {
		_linea.y = 200;
	}
	else{
		_linea.y -= nivel.velocidad1;
	}
}


//-------------------------ARBOLES------------------------------
var _arbol = {y: 0, x:-160};

function dibujaArbol(){
	ctx.drawImage(arbol,0,_arbol.y,394,850,_arbol.x,0,394,850)
}

function movimientoA(){
	if (_arbol.y < 0) {
		_arbol.y = 559;
	}
	else{
		_arbol.y -= nivel.velocidad1;
	}
}


//-------------------------GRAMA------------------------------
var _gr = {y: 200, x:430, h: 850};

function dibujaGr(){
	ctx.drawImage(grama,0,_gr.y,450,_gr.h,_gr.x,0,450,850)
}

function movimientoG(){
		_gr.y = 200;
}
//--------------------------------------ENEMIGOS------------------------------------------------------------------------------
var _kartE = {x: 180 , y: -600, width:177, height:95};



function dibujaKE(){
	ctx.drawImage(car_enemy,0,0,_kartE.height,_kartE.width,_kartE.x,_kartE.y,95,177)
}

function movimientoC(){
	if (_kartE.y > 800) {
		_kartE.y = -500;
		nivel.punto = nivel.punto+1;
		_kartE.y += nivel.velocidad+0.2;
	}
	else{
		_kartE.y += nivel.velocidad;

	}
}


var _kartE1 = {x: 320 , y: -1200,width:177, height:95};
function dibujaKE1(){
	ctx.drawImage(car_1,0,0,_kartE1.height,_kartE1.width,_kartE1.x,_kartE1.y,95,177)
}

function movimientoC1(){
	if (_kartE1.y > 800) {
		_kartE1.y = -500;
		nivel.punto = nivel.punto+1;
	}
	else{
		_kartE1.y += nivel.velocidad;
	}
}


//----------------------COLISION-------------------------------

function colision(){
	if (_kart.y<_kartE.y + _kartE.width-2  &&  _kart.y + _kart.w-2>_kartE.y  &&  _kart.x<_kartE.x + _kartE.height-1  &&  _kart.x + _kart.h-1>_kartE.x) {
		console.log("PUM");
		star=false;
		vida=false;
		choque.play();
		if (nivel.hi<nivel.punto) {
			nivel.hi=nivel.punto;
		}

			}

	if (_kart.y<_kartE1.y + _kartE1.width  &&  _kart.y + _kart.w >_kartE1.y  &&  _kart.x<_kartE1.x + _kartE1.height-1  &&  _kart.x + _kart.h-1>_kartE1.x) {
		console.log("PUM");
		star=false;
		vida=false;
		choque.play();
		if (nivel.hi<nivel.punto) {
			nivel.hi=nivel.punto;
		}
		}


	if (_kart.x <= 98) {
		console.log("PUM edificio");
		star=false;
		vida=false;
		if (nivel.hi<nivel.punto) {
			nivel.hi=nivel.punto;
		}
	}

	if (_kart.x >= 410) {
		console.log("PUM Grama");
		nivel.velocidad -= 0.2;
		nivel.velocidad1 -= 0.2;
		_kart.vx = 1;
		if (nivel.velocidad<=0 && nivel.velocidad1<=0) {
			star=false;
			vida=false;
		}

		if (nivel.hi<nivel.punto) {
			nivel.hi=nivel.punto;
		}
	}
}


function puntuacion(){
	ctx.font = "30px Arial Black";
	ctx.fillStyle= '#fff';
	ctx.fillText(`PTS: ${nivel.punto}`,20,40);

	ctx.font = "30px Arial Black";
	ctx.fillStyle= '#fff';
	ctx.fillText(`HI: ${nivel.hi}`,20,70);

	if (star==false && vida==false) {
		ctx.drawImage(gm,0,0,609,473,0,100,609,473);

		ctx.font = "30px Arial Black";
		ctx.fillStyle= '#414141';
		ctx.fillText(`PRESS SPACE`,190,595);

		ctx.font = "31px Arial Black";
		ctx.fillStyle= '#ffffff';
		ctx.fillText(`PRESS SPACE`,179,600);

		ctx.font = "30px Arial Black";
		ctx.fillStyle= '#ff5d59';
		ctx.fillText(`PRESS SPACE`,182,600);
	}
}

//----------------------------BUCLE----------------------------



var FPS = 50;
setInterval(function(){
	principal();
},1000/FPS);

function principal(){
	borrar();
	dibujaLinea();
	dibujaArbol();
	dibujaGr()
	dibujaCar();
	dibujaKE();
	dibujaKE1();
	colision();
	if (star==true) {
	movimientoL();
	movimientoC();
	movimientoC1();
	movimientoA();
	movimientoG();
	}

	puntuacion();
}
