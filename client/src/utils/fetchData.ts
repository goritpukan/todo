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
export const getData = async (url: string, jwtCookie:string | undefined): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:8000${url}`, {method: 'GET', headers: {
        'Content-Type': 'application/json',
        'Cookie': `access_token=${jwtCookie}`,
      }
    });
    if(res.ok){;
      return await res.json();
    }
  }catch (err){
    console.log(err);
  }
}