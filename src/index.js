import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import currencyExchange from './currencyExchange';

function getCurreny(toCurrency) {
  currencyExchange.getCurreny()
    .then(function (response) {
      console.log(response);
      if (response.conversion_rates) {
        printElements(response, toCurrency);
      }
      else {
        printError(response);
      }
    });
}

function printElements(response, toCurrency) {
  const result = document.querySelector("div#result");
  const amt = document.getElementById("amount").value;

  let rate = response.conversion_rates[toCurrency];
  if (rate) {
    let total = rate * amt;
    result.innerText = `${amt} ${'USD'} = ${total.toFixed(2)} ${toCurrency}`;
    result.removeAttribute('class');
    printCurrencyMessage('');
  } else {
    result.setAttribute("class","defaultHidden");
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
  const toCurrency = document.getElementById("to").value;
  getCurreny(toCurrency);
}

window.addEventListener("load", function () {
  document.querySelector("form").addEventListener("submit", function (event) {
    handleFormSubmission();
    event.preventDefault();
  });
});
