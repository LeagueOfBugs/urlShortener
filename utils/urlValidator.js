export function urlValidator(value) {
  const urlPattern =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?$/;

  if (urlPattern.test(value)) {
    return url.trim();
  } else {
    return null;
  }
}
