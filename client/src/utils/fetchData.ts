export const postData = async (url: string, data: any) => {
  const res = await fetch(url,
    {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
  data = await res.json();
  return {res, data};
}