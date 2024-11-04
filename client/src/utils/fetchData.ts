export const postData = async (url: string, data: any, jwtCookie?: string | undefined): Promise<any> => {
  const headers:any  = {
    'Content-Type': 'application/json'
  }
  if(jwtCookie) headers["Cookie"] = `access_token=${jwtCookie}`;
  const res = await fetch(url,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data)
    });
  data = await res.json();
  return {res, data};
}
export const getData = async (url: string, jwtCookie?: string | undefined): Promise<any> => {
  try {
    const headers:any  = {
      'Content-Type': 'application/json'
    }
    if(jwtCookie) headers["Cookie"] = `access_token=${jwtCookie}`;
    const res = await fetch(`http://localhost:8000${url}`, {
      method: 'GET', headers: headers, credentials: 'include'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log(err);
  }
}
export const patchData = async (url: string, data: any, jwtCookie: string | undefined): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:8000${url}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
      });
      return await res.json();
  } catch (err) {
    console.log(err);
  }
}
export const deleteData = async (url: string, jwtCookie: string | undefined): Promise<any> => {
  try {
    const res = await fetch(`http://localhost:8000${url}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
    return await res.json();
  } catch (err) {
    console.log(err);
  }
}