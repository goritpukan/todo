export const postData = async(url: string, data:any, jwtCookie?: string | undefined):Promise<{res: Response,data: any}> => {
  const headers:Record<string, string> = {
    'Content-Type': 'application/json'
  }
  if(jwtCookie) headers["Cookie"] = `access_token=${jwtCookie}`;
  const res = await fetch(url,
    {
      method: "POST",
      headers: headers,
      credentials: "include",
      body: JSON.stringify(data)
    });
  const resData = await res.json();
  return {res, data: resData};
}
export const getData = async(url: string, jwtCookie?: string | undefined): Promise<any|undefined> => {
  try {
    const headers:Record<string, string>  = {
      'Content-Type': 'application/json'
    }
    if(jwtCookie) headers["Cookie"] = `access_token=${jwtCookie}`;
    console.log(process.env.NEXT_PUBLIC_API_URL + url);
    const res = await fetch(url, {
      method: 'GET', headers: headers, credentials: 'include'
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log(err);
  }
}
export const patchData = async (url: string, data:any): Promise<any|undefined> => {
  try {
    const res = await fetch(url,
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
export const deleteData = async (url: string): Promise<any | undefined> => {
  try {
    const res = await fetch(url,
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