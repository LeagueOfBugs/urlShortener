export async function shortenUrl(url, customKey, customExpireDate) {
  const body = JSON.stringify({
    url,
    customKey,
    customExpireDate,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  };
  console.log("requestOptions", requestOptions);

  try {
    const response = await fetch("http://www.localhost:3000/shortify", requestOptions);
    console.log(response);
    
  } catch (error) {
    console.log(error);
  }
}

export async function findExistingKey() {}
