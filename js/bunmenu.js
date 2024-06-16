var menuIndex = 0;
var dbg_text;
const { ipcRenderer } = require('electron');



//Used for debugging because CUU IS A HACK who doesnt know 
//how to access the developer console in el*ctron
function outputStuff(texto){
  dbg_text = document.getElementsByClassName("pausetext")[0];
  dbg_text.innerHTML = texto;
}

function highlightMenuOption(index){
  switch(index) {
      case 0:
        document.getElementById("resume_button").style.color = "purple";
        document.getElementById("fullscreen_button").style.color = "white";
        document.getElementById("exit_button").style.color = "white";
        break;
      case 1:
        document.getElementById("resume_button").style.color = "white";
        document.getElementById("fullscreen_button").style.color = "purple";
        document.getElementById("exit_button").style.color = "white";
        break;
      case 2:
        document.getElementById("resume_button").style.color = "white";
        document.getElementById("fullscreen_button").style.color = "white";
        document.getElementById("exit_button").style.color = "purple";
        break;
      default:
        // code block
    } 

}

function unpause(){
  vm.togglePause();
}

function toggleFullscreen(){
  var result;
  result = ipcRenderer.send('toggleFullscreen');
}

function exitGame(){
  ipcRenderer.send('exitGame');
}

function displayMenu(){

}

function buntest(){
    if(vm.paused){
        alert("bun");
    }else{
      alert("not bun");
    }
}

function button_accept(){
  if(vm.paused){
    switch(menuIndex) {
        case 0:
        unpause();
          break;
        case 1:
        toggleFullscreen();
          break;
        case 2:
          exitGame();
          break;
        default:
          // code block
      } 
  }
}

function button_cancel(){
  
}

function highlightHovered(index){
  menuIndex = index;
  highlightMenuOption(menuIndex);
}

function button_up(){
  if(menuIndex > 0){
    menuIndex--;
    highlightMenuOption(menuIndex);
  }
}

function button_down(){
  if(menuIndex<2){
  menuIndex++;
  highlightMenuOption(menuIndex);
  }
}


highlightMenuOption(0);
gameControl.on('connect', function(gamepad) {
  //Button 3 = Xbox's "Y" Button, Pl*ystation's Triangle Button.
  gamepad.before('button3',     () => { vm.togglePause()});
  gamepad.before('button2',     () => { button_cancel()});
  gamepad.before('button0',     () => { button_accept()});

  //Buttons 12 and 13 are D-Pad's Up and Down respectively.
  gamepad.before('button12',     () => { button_up()});
  gamepad.before('button13',     () => { button_down()});
  gamepad.before('up0',     () => { button_up()});
  gamepad.before('down0',     () => { button_down()});
});