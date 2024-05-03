import { debounce } from "./utils/debounce";

const urlToShortenEl = document.querySelector("#url");
const urlFormEl = document.querySelector("#url-form");
const keyEl = document.querySelector("#key");
const expirationEl = document.querySelector("#expiration");
const submitBtn = document.querySelector("#submit");
const urlError = document.querySelector("#url-error");
import { shortenUrl, findExistingKey } from "./service/clientCalls";

document.addEventListener(
  "input",
  debounce(async (evt) => {
    console.log("evt.target", evt.target.style.display);
    switch (evt.target.id) {
      case "url":
        break;
      case "key":
        const keyLookup = await findExistingKey(evt.target.value);
        if (keyLookup) {
          // cannot use key
          urlError.textContent = "Key already taken. Please choose another";
          urlError.style.visibility = "visible";
          submitBtn.disable = true;
        } else {
          urlError.style.visibility = "hidden";
          submitBtn.disable = false;
        }
        break;
      case "expiration":
        break;

      default:
        break;
    }
  }, 490)
);

urlFormEl.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const url = urlToShortenEl.value;
  const key = keyEl.value;
  const expiration = expirationEl.value;

  const result = await shortenUrl(url, key, expiration);
});
