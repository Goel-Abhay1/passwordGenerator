"use strict";
let inputSlider = document.querySelector("[inputSlider]")
let password = ""
let passwordlength = 10;
let lengthHTML = document.querySelector("[lengthcount]")
inputSlider.addEventListener("input",()=>{
    passwordlength = inputSlider.value;
    lengthHTML.innerHTML = passwordlength
})
let checkedNum = 0;
const randomNum = (min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min)
}
const upperCase = ()=>{
    return String.fromCharCode(randomNum(65,90))
}
const lowerCase = ()=>{
    return String.fromCharCode(randomNum(97,122))
}
const numericDigit= ()=>{
    return String.fromCharCode(randomNum(48,57))
}
const symbols = ()=>{
    let string = "!@#$%^&*()?/|"
    return string[randomNum(0,string.length-1)]
}
const inputArray = [
    {
        enabled:true,
        button : document.querySelector("#uppercase"),
        "function" :upperCase
    },
    {
        enabled:false,
        button : document.querySelector("#lowercase"),
        "function" :lowerCase
    },
    {
        enabled:false,
        button : document.querySelector("#numbers"),
        "function" :numericDigit
    },
    {
        enabled:false,
        button : document.querySelector("#symbols"),
        "function" : symbols
    }
]
inputArray.forEach((obj,idx,arr)=>{
    obj["button"].addEventListener("change",()=>{
        arr[idx]["enabled"] = obj["button"].checked;
    })
})
let generatorButton = document.querySelector("[generatorButton]")
generatorButton.addEventListener("click",solution)
function solution(e){
    checkedNumCalc();
    if(checkedNum>0){
        if(checkedNum > passwordlength){
            inputSlider.value = checkedNum
            lengthHTML.innerHTML = checkedNum
            passwordlength = checkedNum
        }
        sortArray();
        let everyTime = Math.floor(passwordlength/checkedNum)
        let randomTime = passwordlength%checkedNum
        genericLoop(everyTime, randomTime);
        randomiseArray();
        document.querySelector("[displayPassword]").value = password;
        checkedNum=0;
        password=""
    }
}
function checkedNumCalc(){
    inputArray.forEach((obj,idx)=>{
        if(obj.enabled == true){
            checkedNum++;
        }
    })
}

function sortArray(){
    inputArray.sort((a, b) => b.enabled - a.enabled)
}
function genericLoop(everyTime,randomTime){
    const randomChoice = randomNum(0,checkedNum-1);
    for(let i =0; i<checkedNum;i++){
        for(let j=0;j<everyTime;j++)
        password += inputArray[i]["function"]();
    }
    for(let i=0;i<randomTime;i++){
        password+= inputArray[randomChoice]["function"]();
    }
}
function randomiseArray(){
    password = Array.from(password).sort(() => Math.floor(Math.random() * 2) - 1).join("");
}