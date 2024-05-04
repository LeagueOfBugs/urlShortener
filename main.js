import { debounce } from "./utils/debounce";

const urlToShortenEl = document.querySelector("#url");
const urlFormEl = document.querySelector("#url-form");
const keyEl = document.querySelector("#key");
const expirationEl = document.querySelector("#expiration");
const submitBtn = document.querySelector("#submit");
const urlError = document.querySelector("#url-error");
import { shortenUrl, findExistingKey } from "./service/clientCalls";

// Form input logic and error handling
document.addEventListener(
  "input",
  debounce(async (evt) => {
    switch (evt.target.id) {
      case "url":
        break;
      case "key":
        const keyLookup = await findExistingKey(evt.target.value);
        if (keyLookup) {
          // cannot use key
          urlError.textContent = "Key already taken. Please choose another";
          urlError.style.visibility = "visible";
          submitBtn.disabled = true;
        } else {
          urlError.style.visibility = "hidden";
          submitBtn.disabled = false;
        }
        break;
      case "expiration":
        break;

      default:
        break;
    }
  }, 490)
);

// Form submit logic
urlFormEl.addEventListener("submit", async function (evt) {
  evt.preventDefault();

  const url = urlToShortenEl.value;
  const key = keyEl.value;
  const expiration = expirationEl.value;

  const result = await shortenUrl(url, key, expiration);

  if (result) {
    this.reset();
    this.style.visibility = "hidden";
  }
});
