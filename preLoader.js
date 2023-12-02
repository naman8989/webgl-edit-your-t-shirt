var preLoader_id = document.getElementById("preLoaderId");
var progress_bar = document.getElementById("progress-bar");
var data_count = document.getElementById("Datacount");

// i = 0,
//     throttle = 0.7; // 0-1
data_count.classList.add("blink_me");
function preloaderDataInput(e){
  data_count.innerText = e
}

// preLoader_id.classList.add("done");

function removePreLoader(){
  if(preloaderRemoveable){
    preLoader_id.classList.add("done");
  }
}

preloaderRemoveable = false;
function createButton(){
  preloaderRemoveable = true;
  data_count.style.cursor = "pointer";
  data_count.style.color = "orange";
  data_count.style.textDecorationLine = "overline underline";
  data_count.style.textDecorationStyle = "double";
  data_count.innerText = "Click to Enter"

}
// (function draw() {
//   if(i <= 100) {
//     var r = Math.random();
    
//     requestAnimationFrame(draw);  
//     progress_bar.style.width = i + '%';
//     data_count.innerHTML = Math.round(i + 5) + '%';
    
//     if(r < throttle) { // Simulate d/l speed and uneven bitrate
//       i = i + r;
//     }
//   } else {;
//     data_count.classList.remove("blink_me");
//     progress_bar.classList.add("done");
//     // preLoader_id.classList.add("done");
//     // progress_bar.style.height = "100%"
//     // progress_bar.style.top = "0"
//     // preLoader_id.style.opacity = "0"
//     // progress_bar.style.transition = "all .33s ease"
//   }
// })();