import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import currencyExchange from './currencyExchange';

function getCurreny(toCurrency) {
  currencyExchange.getCurreny()
    .then(function (response) {
      if (response.conversion_rates) {
        printElements(response, toCurrency);
      }
      else {
        printError(response);
      }
    });
}

function printElements(response, toCurrency) {
  const result = document.getElementById("result");
  // const converted_amount = document.getElementById("to").value;
  const amt = document.getElementById("amount").value;

  let rate = response.conversion_rates[toCurrency];
  if (rate) {
    let total = rate * amt;
    result.innerHTML = `${amt} ${'USD'} = ${total}
            ${toCurrency}`;
  } else {
    printCurrencyDoesNotExistError();
  }
}

function printError(error) {
  document.querySelector('#showResponse').innerText =
    `There was an error trying to accessing exchangerate-api.com. ${error}`;
}

function printCurrencyDoesNotExistError() {
  document.querySelector('#showResponse').innerText =
    'Sorry that currency does not yet exist. Our team working really hard on it. Please check back later!';

}

function handleFormSubmission() {
  const toCurrency = document.getElementById("to").value;
  getCurreny(toCurrency);
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    handleFormSubmission();
    event.preventDefault();
  });
});
