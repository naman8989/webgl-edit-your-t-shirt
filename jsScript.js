var envRandomChangeTime = null;
var varRandomChange = null;

function envRandomChange(InTiming){
    clearInterval(varRandomChange);
    envRandomChangeTime= InTiming;
    varRandomChange = setInterval(
        ()=>{ 
            temp = `${Math.random()},${Math.random()},${Math.random()},1.0`;
            unityBridge.SendMessage("envControlCenter","changeWallColor",temp);
            unityBridge.SendMessage("envControlCenter","changeTShirtFrontColor",temp);
            unityBridge.SendMessage("envControlCenter","changeTShirtBackColor",temp);
            unityBridge.SendMessage("envControlCenter","changeTShirtBodyColor",temp);
        },
        envRandomChangeTime * 1000
    )
}
function envClearRandomChange(){
    envRandomChangeTime = 0;
    clearInterval(varRandomChange);
}