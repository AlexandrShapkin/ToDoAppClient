async function Fetcher(url: string, init?: RequestInit) {
  return fetch(url, init).then((res) => {
    return res.json();
  });
}

export default Fetcher;