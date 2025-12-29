const BASE_URL =  "https://v6.exchangerate-api.com/v6/66e8a3ad1e4ac4ca4c77f97c/latest/USD";



const dropdowns = document.querySelectorAll('.dropdown select');

const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

document.addEventListener("load",() =>{
    updateExchangeRate();   
} )


for(let select of dropdowns){
    for(currcode in countryList){
        // console.log(currcode, countryList);
        let newOption = document.createElement('option');
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = true;
        }
        else if (select.name === "to" && currcode === "INR"){
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener('change',(evt) =>{
        updateFlag(evt.target);
    });

}

const updateFlag = (element) => {
   let currcode = element.value;
  let countrycode = countryList[currcode];
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`; 
  let img = element.parentElement.querySelector('img'); 
  img.src = newSrc;
}

btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
 
});

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtValue = amount.value;
   if (amtValue === "" || amtValue < 1){
    amtValue = 1;
    amount.value = 1;
    //    alert("Please enter a valid amount");
       
   }
//    console.log(fromCurr.value, toCurr.value);
   const URL = `${BASE_URL}`;
     let response = await fetch(URL);
     let data = await response.json();
     let rate = data.conversion_rates[toCurr.value];
let result = (amtValue * rate).toFixed(2);
document.querySelector(".msg").innerText = `${amtValue} ${fromCurr.value} = ${result} ${toCurr.value}`;
}