export default class currencyExchange {

  static getCurreny(fromCurrency) {

    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${fromCurrency}`)
      .then(function (response) {     
        if (!response.ok) {
          
          console.log(response.result);
          const errorMessage = `${response.status} ${response.statusText}`;
          
          console.log(response.statusText);
        
          throw new Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function (error) {
        return error;
      });
  }
}