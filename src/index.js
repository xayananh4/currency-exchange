import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import currencyExchange from './currencyExchange';

function getCurreny(fromCurrency) {
  currencyExchange.getCurreny(fromCurrency)
    .then(function (response) {
      if (response.conversion_rates) {
        printElements(response, fromCurrency);
      }
      else {
        printError(response);
      }
    });
}

function printElements(response, fromCurrency) {
  const result = document.getElementById("result");
  const amt = document.getElementById("amount").value;
  const toCurrency = document.getElementById("to").value;

  let rate = response.conversion_rates[toCurrency];
  if (rate) {
    let total = rate * amt;
    result.innerHTML = `${amt} ${fromCurrency} = ${total.toFixed(2)}
            ${toCurrency}`;
    printCurrencyMessage('');
  } else {
    result.innerHTML = '';
    const message = 'Sorry that currency does not yet exist. Our team working really hard on it. Please check back later!';
    printCurrencyMessage(message);
  }
}

function printError(error) {
  document.querySelector('#showResponse').innerText =
    `There was an error trying to accessing Exchangerate-API: ${error}`;
}

function printCurrencyMessage(message) {
  document.querySelector('#showResponse').innerText = message;

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
