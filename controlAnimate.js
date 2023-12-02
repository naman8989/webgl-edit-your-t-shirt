menus = document.querySelector("#menus");
TColor = document.querySelector("#TColor");
FImage = document.querySelector("#FImage");
BImage = document.querySelector("#BImage");
audioSet = document.querySelector("#audioSet");

ColorSelected = null;
tempInterval = null;

function TShirtColorChange(co, nothex){
    if(!(nothex)){
        rootEle = document.querySelector(':root');
        cs = getComputedStyle(rootEle);
        rg = hexToRgbA( cs.getPropertyValue(`${co}`) );
        // console.log(co)
        rg = rg.split(',');
        rg[0] = Number(rg[0]) / 255;
        rg[1] = Number(rg[1]) / 255;
        rg[2] = Number(rg[2]) / 255;
        rg[3] = Number(rg[3]);
        co = `${rg[0]},${rg[1]},${rg[2]},${rg[3]}`
    }
    
    // console.log( `${rg[0]},${rg[1]},${rg[2]},${rg[3]}` )
    ColorSelected = co;
    unityBridge.SendMessage("envControlCenter","changeWallColor",co);
    unityBridge.SendMessage("envControlCenter","changeTShirtFrontColor",co);
    unityBridge.SendMessage("envControlCenter","changeTShirtBackColor",co);
    unityBridge.SendMessage("envControlCenter","changeTShirtBodyColor",co);
}

function hexToRgbA(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255].join(',')+',1';
    }
    console.log(hex);
    throw new Error('Bad Hex');
}

// function TShirtColorChangeRandom(timeing){
//     if(timeing == null){timeing = 1000;}
//     tempInterval = setInterval(()=>{
//         tempCo = `${Math.random()},${Math.random()},${Math.random()},1.0`;
//         TShirtColorChange(tempCo);
//     },timeing);
// }

// function TShirtColorChangeRandomClose(){
//     clearInterval(tempInterval);
// }

function flashAnimation(){
    document.getElementById("controlerdiv").classList.add("draggerRandomBlink");
    setTimeout(() => {
        document.getElementById("controlerdiv").classList.remove("draggerRandomBlink");
    },100);
}

controlDisplay = [TShirtColor,FrontImage,BackImage];   
function disappearbullets(e){
    for(let i=0; i<controlDisplay.length; i++){
        if(e == i){
            controlDisplay[i].style.display = "flex"
            if(e == 0){
                flashAnimation();
                setTimeout(()=>{
                    autoColor = false;
                },400)
            }
            if(e == 1){
                flashAnimation()
                setTimeout(()=>{
                    autoTexture = false;
                    frontEditingMode();
                },400)
            }
            if(e == 2){
                flashAnimation()
                setTimeout(()=>{
                    autoTexture = false;
                    backEditingMode();
                },400)
            }
        }else{
            controlDisplay[i].style.display = "none"
        }
    }
}

// from front Image functions

frontBorderData = [-0.26,0.26,0.26,-0.26];
frontTextPos = [0.0,0.0]
frontSize = 1.0;

uplodedFrontImage = false;
function frontImageFile(){
    
        tempid = document.getElementById("frontGetImage").files[0]    
        sendUrl = URL.createObjectURL(tempid);
        document.getElementById("frontDropBox").style.backgroundImage = `url('${sendUrl}')`;
        console.log(sendUrl);
        unityBridge.SendMessage("tempObj", "overrideDirectFront",sendUrl);
    
        
}
function frontShifting(event,pos){
    if(pos == 2 && event.altKey==false){
        frontBorderData[0] = frontBorderData[0] + 0.01;
        if(frontBorderData[0] >= 0.0){frontBorderData[0] = 0.0;}
        if(frontBorderData[0] <= -0.26){frontBorderData[0] = -0.26}
    }
    if(pos == 2 && event.altKey==true){
        frontBorderData[0] = frontBorderData[0] - 0.01;
        if(frontBorderData[0] >= 0.0){frontBorderData[0] = 0.0;}
        if(frontBorderData[0] <= -0.26){frontBorderData[0] = -0.26}
    }
    if(pos == 1 && event.altKey==false){
        frontBorderData[1] = frontBorderData[1] - 0.01;
        if(frontBorderData[1] <= 0.0){frontBorderData[1] =0.0;}
        if(frontBorderData[1] >= 0.26){frontBorderData[1] = 0.26}
    }
    if(pos == 1 && event.altKey==true){
        frontBorderData[1] = frontBorderData[1] + 0.01;
        if(frontBorderData[1] <= 0.0){frontBorderData[1] =0.0;}
        if(frontBorderData[1] >= 0.26){frontBorderData[1] = 0.26}
    }
    if(pos == 0 && event.altKey==false){
        frontBorderData[2] = frontBorderData[2] - 0.01;
        if(frontBorderData[2] <= 0.0){frontBorderData[2] =0.0;}
        if(frontBorderData[2] >= 0.26){frontBorderData[2] = 0.26}
    }
    if(pos == 0 && event.altKey==true){
        frontBorderData[2] = frontBorderData[2] + 0.01;
        if(frontBorderData[2] <= 0.0){frontBorderData[2] =0.0;}
        if(frontBorderData[2] >= 0.26){frontBorderData[2] = 0.26}
    }
    if(pos == 3 && event.altKey==false){
        frontBorderData[3] = frontBorderData[3] + 0.01;
        if(frontBorderData[3] >= 0.0){frontBorderData[3] = 0.0;}
        if(frontBorderData[3] <= -0.26){frontBorderData[3] = -0.26}
    }
    if(pos == 3 && event.altKey==true){
        frontBorderData[3] = frontBorderData[3] - 0.01;
        if(frontBorderData[3] >= 0.0){frontBorderData[3] = 0.0;}
        if(frontBorderData[3] <= -0.26){frontBorderData[3] = -0.26}
    }
    unityBridge.SendMessage("envControlCenter","frontAxisLog",`${frontBorderData[0]},${frontBorderData[1]},${frontBorderData[2]},${frontBorderData[3]}`);

}
function frontTextSizing(val){
    frontSize = val;
    unityBridge.SendMessage("envControlCenter","changeFrontTextSize", Number(frontSize));
}
function frontTextPosx(val){
    frontTextPos[0] = val;
    unityBridge.SendMessage("envControlCenter","positionFront",`${frontTextPos[0]},${frontTextPos[1]}`);
}
function frontTextPosy(val){
    frontTextPos[1] = val;
    unityBridge.SendMessage("envControlCenter","positionFront",`${frontTextPos[0]},${frontTextPos[1]}`);
}



// from back Image functions

backBorderData = [-0.26,0.26,0.26,-0.26];
backTextPos = [0.0,0.0]
backSize = 1.0;

uploadedBackImage = false;
function backImageFile(){

        tempid = document.getElementById("backGetImage").files[0]    
        sendUrl = URL.createObjectURL(tempid);
        document.getElementById("backDropBox").style.backgroundImage = `url('${sendUrl}')`;
        unityBridge.SendMessage("tempObj", "overrideDirectBack",sendUrl);
        // unityBridge.SendMessage("envControlCenter", "uploadBackTexture",sendUrl,true);
        // console.log(sendUrl);

        // tempid = document.getElementById("frontGetImage").files[0]    
        // sendUrl = URL.createObjectURL(tempid);
        // document.getElementById("frontDropBox").style.backgroundImage = `url('${sendUrl}')`;
        // console.log(sendUrl);
    
}
function backShifting(event,pos){
    // console.log(backBorderData,pos);
    if(pos == 2 && event.altKey==false){
        backBorderData[0] = backBorderData[0] + 0.01;
        if(backBorderData[0] >= 0.0){backBorderData[0] = 0.0;}
        if(backBorderData[0] <= -0.26){backBorderData[0] = -0.26}
    }
    if(pos == 2 && event.altKey==true){
        backBorderData[0] = backBorderData[0] - 0.01;
        if(backBorderData[0] >= 0.0){backBorderData[0] = 0.0;}
        if(backBorderData[0] <= -0.26){backBorderData[0] = -0.26}
    }
    if(pos == 1 && event.altKey==false){
        backBorderData[1] = backBorderData[1] - 0.01;
        if(backBorderData[1] <= 0.0){backBorderData[1] =0.0;}
        if(backBorderData[1] >= 0.26){backBorderData[1] = 0.26}
    }
    if(pos == 1 && event.altKey==true){
        backBorderData[1] = backBorderData[1] + 0.01;
        if(backBorderData[1] <= 0.0){backBorderData[1] =0.0;}
        if(backBorderData[1] >= 0.26){backBorderData[1] = 0.26}
    }
    if(pos == 3 && event.altKey==false){
        backBorderData[2] = backBorderData[2] - 0.01;
        if(backBorderData[2] <= 0.0){backBorderData[2] =0.0;}
        if(backBorderData[2] >= 0.26){backBorderData[2] = 0.26}
    }
    if(pos == 3 && event.altKey==true){
        backBorderData[2] = backBorderData[2] + 0.01;
        if(backBorderData[2] <= 0.0){backBorderData[2] =0.0;}
        if(backBorderData[2] >= 0.26){backBorderData[2] = 0.26}
    }
    if(pos == 0 && event.altKey==false){
        backBorderData[3] = backBorderData[3] + 0.01;
        if(backBorderData[3] >= 0.0){backBorderData[3] = 0.0;}
        if(backBorderData[3] <= -0.26){backBorderData[3] = -0.26}
    }
    if(pos == 0 && event.altKey==true){
        backBorderData[3] = backBorderData[3] - 0.01;
        if(backBorderData[3] >= 0.0){backBorderData[3] = 0.0;}
        if(backBorderData[3] <= -0.26){backBorderData[3] = -0.26}
    }
    unityBridge.SendMessage("envControlCenter","backAxisLog",`${backBorderData[0]},${backBorderData[1]},${backBorderData[2]},${backBorderData[3]}`);

}
function backTextSizing(val){
    backSize = val;
    unityBridge.SendMessage("envControlCenter","changeBackTextSize", Number(backSize));
}
function backTextPosx(val){
    backTextPos[0] = val;
    unityBridge.SendMessage("envControlCenter","positionBack",`${Number(backTextPos[0])},${Number(backTextPos[1])}`);
}
function backTextPosy(val){
    backTextPos[1] = val;
    unityBridge.SendMessage("envControlCenter","positionBack",`${backTextPos[0]},${backTextPos[1]}`);
}


// wall texture manage
wallRot = 0;
audioCurrentTiming =0;

async function audioWaveReduction(e){
    if(e < 0.0){ e = e * -1;}
    
    e = e / 10;        
    if(e > 0.0007){
        e = await audioWaveReduction(e);
    }
        return e;
        
}


// all texture setting

allTextureNames = [];
// textureName = "";
async function textureChunkNames(e){
    await fetch(`./fetchTexture:${e}`)
    .then(x => x.text())
    .then(y =>{
        // console.log(y);
        // console.log(y.split(":"));
        allTextureNames = y.split(":");
    })
}



// audio setting

function toggleMute(){  
    autoMusic = false
    if(document.getElementById("mute").innerText == "volume_up"){
        document.getElementById("mute").innerText = "volume_off";
        unityBridge.SendMessage("envControlCenter","pauseAudio");
        
    }else{
        document.getElementById("mute").innerText = "volume_up";
        unityBridge.SendMessage("envControlCenter","playAudio");
    }
}

function togglePlay(){
    autoMusic = false
    if(document.getElementById("playStop").innerText == "play_arrow"){
        document.getElementById("playStop").innerText = "stop";
        unityBridge.SendMessage("envControlCenter","stopAudio");
        
    }else{
        document.getElementById("playStop").innerText = "play_arrow";
        unityBridge.SendMessage("envControlCenter","playAudio");
    }
}

async function nextSong(){
    audioChComGiv = true;
    audioOnIndex = audioOnIndex + 1;
    if(audioOnIndex >= allotedAudio){audioOnIndex = 0;}
    playSound(audioOnIndex);
}

async function prevSong(){
    audioChComGiv = true;
    audioOnIndex = audioOnIndex - 1;
    if(audioOnIndex < 0){audioOnIndex = allotedAudio + audioOnIndex;}
    playSound(audioOnIndex);
        
}


allAudioNames = [];
audioPlayName = "";
async function audioChunkNames(e){
    await fetch(`./allAudios:${e}`)
    .then(x => x.text())
    .then(y =>{
        // console.log(y);
        // console.log(y.split(":"));
        allAudioNames = y.split(":");
    })
}


currentSongData = null
partitions = null

async function playSound(ind){
    document.getElementById("songName").innerText = allAudioNames[ind];
    document.getElementById("songName").classList.add("blink_me");
    unityBridge.SendMessage("envControlCenter", "changeAudioFromIndex",ind);
    unityBridge.SendMessage("envControlCenter", "playAudio");
    setTimeout(()=>{
        document.getElementById("songName").classList.remove("blink_me");
    },200)
}





// setTimeout( async()=>{
//     await addAudios(audioPosition)
//     removePreLoader()
//     startRandomServing(1.5, 3);
//     await playSound(audioNames,audioLength)
//     togglePlay();
// },5000)





// manage fps
// loadar and canvas

let tshirtI = 0;
let tshirtSpeed = 0.8;
autoTshirt = true;

let cameraSpI = 0;
let cameraSpeed = 1.6;
autoCamera = true;

let colorChI = 0;
let colorChSpeed =0.015;
autoColor = true;

let textureChI = 0;
let textureChSpeed = 0.01;
let textureOnIndex = 0;
autoTexture = true;
changingFrText = true;
function RandomChangeTexture(){
    textureOnIndex = textureOnIndex + 1;
    if(textureOnIndex >= allotedTexture){textureOnIndex = 0;}
    if(changingFrText){
        changingFrText = false;
        unityBridge.SendMessage("envControlCenter", "changeFrontTextureFromIndex",textureOnIndex);
    }
    else{
        changingFrText = true;
        temp = textureOnIndex + 2;
        if(temp >= allotedTexture){ temp = temp - allotedTexture }
        unityBridge.SendMessage("envControlCenter", "changeBackTextureFromIndex",temp);        
    }
}


let audioOnIndex = 0;
let audioChComGiv = false;
autoMusic = true;
// setTimeout(() => {  
//     frameRating();
// }, 5000);


prevmileSec =0;
delaTime = 0
function frameRunning(){
    inval = new Date();
    if(inval.getMilliseconds() < prevmileSec){
        deltaTime = (999 - prevmileSec) + inval.getMilliseconds();
    }else{
        deltaTime = inval.getMilliseconds() - prevmileSec;
    }
    
    
    // ----------------
    if(autoTshirt){
        tshirtI = tshirtI + (tshirtSpeed * (deltaTime/12));
        if(tshirtI >=360){tshirtI=0.0;}
        unityBridge.SendMessage("envControlCenter", "setPivoteuler", `0.0,${tshirtI},0.0`);
    }
    if(autoCamera){
        cameraSpI = cameraSpI + (cameraSpeed * (deltaTime/12));
        if(cameraSpI >=360){cameraSpI=0.0;}
        unityBridge.SendMessage("envControlCenter", "changeTShirteuler",`0.0,${cameraSpI},0.0`);
    }
    if(autoColor){
        colorChI = colorChI + (colorChSpeed * (deltaTime/12));
        if(colorChI >= 1.5){
            colorChI = 0.0;
            TShirtColorChange(`${Math.random()},${Math.random()},${Math.random()},1.0`, true);
        }
    }
    if(autoTexture){
        textureChI = textureChI + (textureChSpeed * (deltaTime/12));
        if(textureChI >= 4){
            textureChI = 0;
            RandomChangeTexture();
        }
    }
    if(autoMusic){
        if(audioCurrentTiming == 0 && (!audioChComGiv)){
            audioChComGiv = true;
            audioOnIndex = audioOnIndex + 1;
            if(audioOnIndex >= allotedAudio){audioOnIndex = 0;}
            setTimeout(()=>{
                playSound(audioOnIndex);
            },2000)
        }
        if(audioCurrentTiming != 0 ){
            audioChComGiv = false;
        }
    }
    // ----------------



    prevmileSec = inval.getMilliseconds();
    requestAnimationFrame(frameRunning)
}




// Mode change

const dragToggle = function(override){
    if( ( (2 <= (window.innerWidth/window.innerHeight)) && ((window.innerWidth/window.innerHeight) <= 3.2) ) || override){
        invalTemp = document.getElementById("controlContext");
        drager = document.getElementById("drager");
        if(invalTemp.style.display != "none"){
            drager.innerText = "Edit Your T-Shirt";
            document.getElementById("controlerdiv").classList.remove("draggerRandomRev");
            setTimeout(()=>{
                document.getElementById("controlerdiv").classList.add("draggerRandomSt");
                previewMode();
                setTimeout(()=>{
                    invalTemp.style.display = "none";
                },375)
            },50)
        }else{
            drager.innerText = "Preview";
            document.getElementById("controlerdiv").classList.remove("draggerRandomSt");
            setTimeout(()=>{
                document.getElementById("controlerdiv").classList.add("draggerRandomRev");
                editMode();
                setTimeout(()=>{
                    invalTemp.style.display = "flex";                    
                },375);
            },50)
            
        }    
    }else{
        alert("Orientation Is Sot Suited For Editing. Please Use A Desktop Or Tilt Your Phone Screen");
    }
}

function frontEditingMode(){
    tshirtI = 0;
    cameraSpI = 0;
    cameraSpeed = 1;
    tshirtSpeed = 1;
    unityBridge.SendMessage("envControlCenter", "changeTShirteuler",`0.0,0.0,0.0`);
    unityBridge.SendMessage("envControlCenter", "setPivoteuler", `0.0,0.0,0.0`);
}
function backEditingMode(){
    tshirtI = 0;
    cameraSpI = 180;
    cameraSpeed = 1;
    tshirtSpeed = 1;
    unityBridge.SendMessage("envControlCenter", "changeTShirteuler",`0.0,0.0,0.0`);
    unityBridge.SendMessage("envControlCenter", "setPivoteuler", `0.0,180.0,0.0`);
}
function previewMode(){
    cameraSpeed = 1.6;
    tshirtSpeed = 0.8;
}
function editMode(){
    cameraSpeed = 1.0;
    tshirtSpeed = 0.5;
}



// Initial loading phase 

async function uploadAudioToUnity(a,total){
    if(a > total-1){
        audioUpload = true;
        setTimeout(()=>{
            unityBridge.SendMessage("envControlCenter","stopAudio");
        },200)        
        return;
    }
    await unityBridge.SendMessage("envControlCenter","uploadAudio",`${location.href}audio/${allAudioNames[a]}`)
    clearCheck = setInterval(async()=>{
        await unityBridge.SendMessage("envControlCenter","audioArrLen");
        if(a+1 == unityReturnData){
            clearInterval(clearCheck);
            setTimeout(()=>{
                unityBridge.SendMessage("envControlCenter","stopAudio");
            },200)
            await uploadAudioToUnity(a+1,total);
        }    
    },200)
    
}

async function audioEnergyChunk(a,total){
    energyAud = []
    for(let i=0; i<total; i++){
        setTimeout(()=>{
            fetch(`/energyof/${allAudioNames[i]}`)
            .then(x => x.text())
            .then(y=>{
                // console.log("got it : "+parseFloat(y.slice(1,y.length-1)));
                y = parseFloat(y.slice(1,y.length-1));
                energyAud.push(y);
            })
        },200)
    }
    // console.log("the length is : " +total)
    sendenergy = "";
    energyAudInterval = setInterval(()=>{
        if(energyAud.length == total){
            clearInterval(energyAudInterval);
            sendenergy = sendenergy + `${energyAud[0]}`
            for(let i=1; i<total; i++){
                sendenergy = sendenergy + `,${energyAud[i]}`
            }
            unityBridge.SendMessage("envControlCenter","setAudioEnergy",sendenergy);
        }
    },200)
}

async function loadingAudios(e){
    await audioChunkNames(e);
    await audioEnergyChunk(0,e);
    setTimeout(async()=>{
        await uploadAudioToUnity(0,e);
    },2000)
}


async function uplaodTexutureToUnity(a,total){
    // console.log("for:" +a)
    if(a > total-1){
        textureUpload = true;
        return ;
    }
    await unityBridge.SendMessage("envControlCenter","uploadFrontTexture",`${location.href}textures/${allTextureNames[a]}`,false)
    clearCheck = setInterval(async()=>{
        await unityBridge.SendMessage("envControlCenter","textureArrLen");        
        if(a+1 == unityReturnData){
            clearInterval(clearCheck);
            await uplaodTexutureToUnity(a+1,total);
        }    
        return ;        
    },200)
    
}


async function loadingTextures(e){
    await textureChunkNames(e); 
    await uplaodTexutureToUnity(0,e);
}

