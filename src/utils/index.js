const API_URL = "http://assignment.bunq.com";

export const localeDateFormat = new Intl.DateTimeFormat(navigator.language).format;
export const localeTimeFormat = new Intl.DateTimeFormat(navigator.language, {
  hour: "numeric",
  minute: "numeric"
}).format;

export const getData = async (url) => {
  const response = await fetch(`${API_URL}/${url}`);
  return await response.json();
}

export const sendData = async (url, data) => {
  const response = await fetch(
    `${API_URL}/${url}`, {
      method: 'POST',
      body: JSON.stringify(data)
    }
  );
  return await response.json();
}