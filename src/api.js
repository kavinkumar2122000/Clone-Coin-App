export async function fetchCryptocurrencies(page, pageSize) {
    const response = await fetch(`https://api.coincap.io/v2/assets?limit=${pageSize}&offset=${(page - 1) * pageSize}`);
    const data = await response.json();
    return data.data;
  }
  