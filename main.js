import { debounce } from "./utils/debounce";

const urlToShortenEl = document.querySelector("#url");
const urlFormEl = document.querySelector("#url-form");
const keyEl = document.querySelector("#key");
const expirationEl = document.querySelector("#expiration");
const submitBtn = document.querySelector("#submit");

import { shortenUrl, findExistingKey } from "./service/clientCalls";

document.addEventListener(
  "input",
  debounce(async (evt) => {
    console.log("evt.target", evt.target);
    switch (evt.target.id) {
      case "url":
        const keyLookup = await findExistingKey(evt.target.value);
        if (keyLookup) {
          // cannot use key
        }
        break;
      case "key":
        break;
      case "expiration":
        break;

      default:
        break;
    }
  }, 400)
);

urlFormEl.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const url = urlToShortenEl.value;
  const key = keyEl.value;
  const expiration = expirationEl.value;

  const result = await shortenUrl(url, key, expiration);
});
