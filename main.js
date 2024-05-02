const urlToShortenEl = document.querySelector("#url");
const urlFormEl = document.querySelector("#url-form");
const keyEl = document.querySelector("#key");
const expirationEl = document.querySelector("#expiration");
const submitBtn = document.querySelector("#submit");
import { shortenUrl, findExistingKey } from "./service/clientCalls";

document.addEventListener("input", (evt) => {});

urlFormEl.addEventListener("submit", async (evt) => {
  evt.preventDefault();

  const url = urlToShortenEl.value;
  const key = keyEl.value;
  const expiration = expirationEl.value;

  const result = await shortenUrl(url, key, expiration);
  console.log("rersult", result);
});
