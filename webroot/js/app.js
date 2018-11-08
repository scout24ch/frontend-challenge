(function () {
  document.addEventListener('DOMContentLoaded', function () {

    // DEMO only, you probably want to remove this line
    fetch('http://localhost:8081/')
      .then(function (result) {
        return result.json()
      })
      .then(function (json) {
        document.querySelector('.frontend-challenge-demo-box .status').textContent = json.message
      })
    // DEMO end

  })
})()