import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import currencyExchange from './currencyExchange';

function getCurreny(fromCurrency) {
  currencyExchange.getCurreny(fromCurrency)
    .then(function (response) {
      if (response.conversion_rates) {
        printElements(response, fromCurrency);
      } else {
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

function printError(error, fromCurrency) {
  document.querySelector('#showResponse').innerText = 
  `There was an error accessing data.  Your form of currency: ${fromCurrency}
  -- ${error}.`;
}

function handleFormSubmission() {
  // const fromCurrency = document.getElementById("from").value;
  getCurreny('Wakandan');
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    handleFormSubmission();
    event.preventDefault();
  });
});
