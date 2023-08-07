export default async function Fetcher(url: string, init?: RequestInit) {
  return fetch(url, init).then((res) => {
    console.log(res.headers.get("refreshToken"));
    return res.json();
  });
}
