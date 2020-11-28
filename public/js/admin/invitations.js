(() => {
  "use strict"

  const main = document.querySelector("main");
  const form = main.querySelector("form");

  form.addEventListener("submit", handleSubmit);

  /**
   * @param {Event} event
   */
  function handleSubmit(event) {
    console.log(event);
  }
})();