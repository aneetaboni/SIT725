document.getElementById('getSum').addEventListener('click', () => {
  const a = document.getElementById('inputA').value;
  const b = document.getElementById('inputB').value;

  fetch(`/add?a=${a}&b=${b}`)
    .then(response => response.json())
    .then(data => {
      if (data.result !== undefined) {
        document.getElementById('result').innerText = `Result: ${data.result}`;
      } else {
        document.getElementById('result').innerText = `Error: ${data.error}`;
      }
    })
    .catch(error => {
      document.getElementById('result').innerText = 'Server error';
    });
});
