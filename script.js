const inputLength = document.getElementById("input-length");
const lengthDisplay = document.getElementById("length-display");
const passwordDisplay = document.getElementById("data-display");
const dataCopy = document.getElementById("data-copy");
const dataCopyMsg = document.querySelector("[data-copyMsg]");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const includeNumbers = document.getElementById("include-numbers");
const includeSymbols = document.getElementById("include-symbols");
const strength = document.getElementById("strength");
const generatePassword = document.getElementById("generate-password");

let passwordLength = 15;
let checkCount = 0;


handleSlider();

function getEachLength(){
    if(lowercase.checked){
        checkCount++;
    }
    if(uppercase.checked){
        checkCount++;
    }
    if(includeNumbers.checked){
        checkCount++;
    }
    if(includeSymbols.checked){
        checkCount++;
    }

    let eachLength = Math.floor(passwordLength / checkCount);
    return eachLength;
}

function reShuffle(password){
    for(let i = passwordLength - 1; i >= 0; i--){
        let j = Math.floor(Math.random() * (i + 1));

        let temp = password[i];
        password[i] = password[j];
        password[j] = temp;
    }
    return password;
}

// Generate Password
generatePassword.addEventListener('click', function(){
    let eachLength = getEachLength();
    let currLength = passwordLength;
    let password = [];
    
    while(currLength > 0 && checkCount >= 1){
        if(lowercase.checked){
            if(eachLength > currLength){
                eachLength = currLength;
            }
            for(let i = 0; i < eachLength; i++){
                password.push(generateLowerCase());
            }
            currLength -= eachLength;
        }
        if(currLength > 0 && uppercase.checked){
            if(eachLength > currLength){
                eachLength = currLength;
            }
            for(let i = 0; i < eachLength; i++){
                password.push(generateUpperCase());
            }
            currLength -= eachLength;
        }
        if(currLength > 0 && includeNumbers.checked){
            if(eachLength > currLength){
                eachLength = currLength;
            }
            for(let i = 0; i < eachLength; i++){
                password.push(getRandomInteger(0, 9));
            }
            currLength -= eachLength;
        }
        if(currLength > 0 && includeSymbols.checked){
            if(eachLength > currLength){
                eachLength = currLength;
            }
            for(let i = 0; i < eachLength; i++){
                password.push(generateSymbols());
            }
            currLength -= eachLength;
        }
    }
    password = reShuffle(password);
    passwordDisplay.value = password.join('');
    checkCount = 0;
});

// Copy Password
dataCopy.addEventListener('click', copyPassword);

// Set password default length
function handleSlider(){
    inputLength.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
}

// Set password length
inputLength.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
});

function setIndicator(color){
    setIndicator.style.backgroundColor = color;
}

function getRandomInteger(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genratorRandomNumber(){
    return getRandomInteger(0, 9);
}

function generateLowerCase(){
    let characters = "abcdefghijklmnopqrstuvwxyz";
    return characters[getRandomInteger(0, 25)];
}

function generateUpperCase(){
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return characters[getRandomInteger(0, 25)];
}

function generateSymbols(){
    let symbols = "'`~!@#$%^&*()-_+={}[]|;:,./<>?";
    return symbols[getRandomInteger(0, symbols.length - 1)];
}

async function copyPassword(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        dataCopyMsg.innerText = "Copied";
    }
    catch(e){
        dataCopyMsg.innerText = "Error";
    }
}