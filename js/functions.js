let miRuleta;
let canvasSize = document.querySelector('#canvas');
canvasSize.width= 400;
canvasSize.height= 400;
let show = document.querySelector('#containerRuleta');
let mjsShow = document.querySelector('#showMessage');
let resultados = document.querySelector('#ganadores');
let ganadores = document.querySelector('#resganadores');
let res = []; 
show.style.display = 'none';
resultados.style.display = 'none';
mjsShow.style.display = 'flex';
let text = document.querySelector('#txtarea');
let arrayTxt = [];
let colorsArray = [
  '#C2148B',
  '#3114C2',
  '#14A7C2',
  '#14C283',
  '#14C231',
  '#C28F14',
  '#C21814',
  '#C21414',
  '#C21487',
  '#A714C2'
];
let t = [];

let ts = ['pide','ve por ellos','invita','recoge dinero', ' no seas joto'];

text.addEventListener("keyup", (event) => { segemtsData(event.target.value); });

function detectarAgent(){
  if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)){canvasSize.style.width="100%";
  }else{canvasSize.style.width="100%";}
}

function segemtsData(event) {
  if (event == '' || event == null) {
    show.style.display = 'none';
    mjsShow.style.display = 'flex';
  } else {
    show.style.display = 'flex';
    show.style.flexDirection= 'column';
    mjsShow.style.display = 'none';

    arrayTxt = [];
    t = [];
    arrayTxt = event.split(',')

    for (let i = 0; i < arrayTxt.length; i++) {
      const element = arrayTxt[i];
      if (element == '' || element == '\n') {}else {t.push({ fillStyle: colorsArray[i], text: element.toString() });}
    }

    miRuleta = new Winwheel({
      numSegments: arrayTxt.length,
      outerRadius: 170,
      segments: t,
      animation: {
        type: "spinToStop",
        duration: 5,
        callbackFinished: "mensaje()",
        callbackAfter: "dibujarIndicador()"
      }
    });

    dibujarIndicador();
  }
}

function getRandomInt(max) {return Math.floor(Math.random() * max);}

function mensaje() {
  let SegmentoSeleccionado = miRuleta.getIndicatedSegment();
  this.saveData(SegmentoSeleccionado.text);
 
  Swal.fire({
    position: 'center',
    text: 'El ganador es '+SegmentoSeleccionado.text,
    icon: 'success',
    showConfirmButton: false,
    timer: 2000
  });

  miRuleta.stopAnimation(false);
  miRuleta.rotationAngle = 0;
  miRuleta.draw();
  dibujarIndicador();
  resultados.style.display = 'flex';
}

function dibujarIndicador() {
  let ctx = miRuleta.ctx;
  ctx.strokeStyle = "white";
  ctx.fillStyle = "black";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(170, 10);
  ctx.lineTo(230, 10);
  ctx.lineTo(200, 70);
  ctx.lineTo(170, 10);
  ctx.stroke();
  ctx.fill();
}

function saveData(segment){
  ganadores.innerHTML='';
  res.push(segment);
  localStorage.setItem('resultados',res);
  let obtn = localStorage.getItem('resultados');
  obtn = obtn.split(',');
  obtn.forEach(element => {ganadores.insertAdjacentHTML('afterbegin',`<li> ${element} </li>`);});
}
