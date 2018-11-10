(function () {
  // wait for dom ready and call the api
  document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:8081/healthcheck')
      .then(function (result) {
        return result.json()
      })
      .then(function (json) {
        // replace the status text
        document.querySelector('.frontend-challenge-demo-box .status').textContent = json.message + ','
        document.querySelector('.frontend-challenge-demo-box .docs-link').style.display = 'inline'
      })
  })
})()