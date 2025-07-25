document.getElementById('getQuote').addEventListener('click', () => {
  fetch('/api/quote')
    .then(response => response.json())
    .then(data => {
      document.getElementById('quoteDisplay').innerText = data.quote;
    })
    .catch(error => {
      console.error('Error fetching quote:', error);
    });
});
