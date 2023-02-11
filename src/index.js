import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import currencyExchange from './currencyExchange';

function getCurreny(fromCurrency) {
  currencyExchange.getCurreny(fromCurrency)
    .then(function(response) {    
      console.log(response); 

      if(response['error-type'] === "unsupported-code") {
        printCurrencyDoesNotExistError();    
      }
      else if (response.conversion_rates) {
        printElements(response, fromCurrency);
      }
      else{
        console.log(response); 
        printError(response);
      }
    });
}

function printElements(response, fromCurrency) {
  const result = document.getElementById("result");
  const toCurrency = document.getElementById("to").value;
  const amt = document.getElementById("amount").value;
  
  let rate = response.conversion_rates[toCurrency];
  let total = rate * amt;
  result.innerHTML = `${amt} ${fromCurrency} = ${total}
            ${toCurrency}`;
}

function printError(error) {
  document.querySelector('#showResponse').innerText = 
  `There was an error trying to accessing exchangerate-api.com. ${error}`;
}

function printCurrencyDoesNotExistError() {
  document.querySelector('#showResponse').innerText = 
  'Sorry that currency does not yet exist in our app. Our team working really hard on it. Please check back later!';

}

function handleFormSubmission() {
  const fromCurrency = document.getElementById("from").value;
  getCurreny(fromCurrency);
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    handleFormSubmission();
    event.preventDefault();
  });
});
