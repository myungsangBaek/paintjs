const canvas = document.getElementById("jsCanvas"); //canvas 호출
const myContext = canvas.getContext("2d"); // 픽셀들을 컨트롤 
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const INITIAL_COLOR ="#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

myContext.fillStyle = "white";
myContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE );  // bgColor가 default로 white를 가짐
myContext.strokeStyle = "INITIAL_COLOR";  // 그릴 선들이 갖는 색
myContext.fillStyle = "#INITIAL_COLOR"
myContext.lineWidth = 2.5;  //선의 너비

let painting = false; //평상시엔 그림을 그리지않는 상태
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false; 
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        myContext.beginPath();   //path는 선
        myContext.moveTo(x, y);  //x, y 좌표로 path를 이동
        console.log("creating path in " , x, y);
    } else {
        myContext.lineTo(x, y);
        myContext.stroke();  // 획 긋기
        console.log("creating line in " , x, y);
    }
    
}
function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    myContext.strokeStyle = color;  //color를 target으로부터 받아 넣음
    myContext.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    myContext.lineWidth = size;
}

function handleModeClick(event){  //버튼 클릭시 텍스트 변경
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    } else{
        filling = true;
        mode.innerText = "Paint"; 
       
    }
    
}

function handleCanvasClick(){
   if(filling){
    myContext.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE ); // 0,0에서 크기만큼
   }
}

function handleC(event){
    event.preventDefault();  //우클릭 방지
}

function handleSaveClick(){
    const image = canvas.toDataURL();  //default = png
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[EXPORT]";
    link.click();

}

if (canvas){
    canvas.addEventListener("mousemove", onMouseMove); //마우스가 캔버스 위에가면 위치 인식
    canvas.addEventListener("mousedown", startPainting); //마우스 클릭 중
    canvas.addEventListener("mouseup", stopPainting); 
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleC);
}

if (mode){
    mode.addEventListener("click", handleModeClick)
}

if(save){
    save.addEventListener("click", handleSaveClick);
}

// CanvasRenderingContext2D   <- Canvas API 

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if(range){
    range.addEventListener("input", handleRangeChange);

}