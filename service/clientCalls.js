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

  try {
    const response = await fetch(
      "http://www.localhost:3000/shortify",
      requestOptions
    );

    if (!response.ok) {
      throw new Error("Something went wrong while fetching");
    }

    const responseData = await response.json();

    return responseData.shortenedUrl;
  } catch (error) {
    // expand error handling
    console.log(error);
  }
}

export async function findExistingKey() {}
