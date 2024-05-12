import { getTokenFromCookie } from "@/app/_actions/headerAction";
import { ACCESS_TOKEN_KEY } from "./constant";
import { getCookie } from "cookies-next";
import { isClient } from "./commonUtil";


// POST
const post = async (
  endPoint: string,
  data: any,
  option: { baseURL?: any } = {}
): Promise<any> => {
  let response = null;

  const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

  if (data instanceof FormData) {
    // console.log("url : " + url);
    response = await fetch(url, {
      method: "POST",
      headers: await getHeaderFormData(),
      body: data,
    });
  }

  else {
    response = await fetch(url, {
      method: "POST",
      headers: await getHeaderJSON(),
      body: JSON.stringify(data),
    });
  }

  // handle error
  if (!response.ok) {
    handleError({ endPoint, response });
  }

  try {
    return await response.json();
  } catch {
    return response;
  }
};

// PUT
const put = async (
  endPoint: string,
  data: any,
  option: { baseURL?: any } = {}
): Promise<any> => {
  let response = null;
  const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

  if (data instanceof FormData) {
    response = await fetch(url, {
      method: "PUT",
      headers: await getHeaderFormData(),
      body: data,
    });
  } else {
    response = await fetch(url, {
      method: "PUT",
      headers: await getHeaderJSON(),
      body: JSON.stringify(data),
    });
  }

  // handle error
  if (!response.ok) {
    handleError({ endPoint, response });
  }

  try {
    return await response.json();
  } catch {
    return response;
  }
};

// GET
const get = async (
  endPoint: string,
  option: { baseURL?: any } = {}
): Promise<any> => {
  const token = await getToken();
  const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // handle error
  if (!response.ok) {
    handleError({ endPoint, response });
  }

  try {
    return await response.json();
  } catch {
    return response;
  }
};

// DELETE
const del = async (
  endPoint: string,
  option: { baseURL?: any } = {}
): Promise<any> => {
  const token = await getToken();
  const url = `${option.baseURL || getBASE_URL_API()}${endPoint}`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  // handle error
  if (!response.ok) {
    handleError({ endPoint, response });
  }

  try {
    return await response.json();
  } catch {
    return response;
  }
};


// ----- settings ------

async function getToken() {
  return isClient() ? getCookie(ACCESS_TOKEN_KEY) : await getTokenFromCookie();
};

function debug(tag: string, message?: string) {
  console.log(`Debug: ${tag} - ${message}`);
};

async function getHeaderJSON(): Promise<HeadersInit | undefined> {
  const token = await getToken();
  if (token) {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};

function handleError({
  endPoint,
  response,
}: {
  endPoint: string;
  response: Response;
}) {
  debug(`Error: ${endPoint}`, response.text.toString());
};

async function getHeaderFormData() {
  let headers: any = {};
  const token = await getToken();
  if (token) {
    headers = {
      Authorization: `Bearer ${token}`,
    };
  };

  return headers

};

function getBASE_URL_API() {
  return isClient()
    ? process.env.NEXT_PUBLIC_BASE_URL_API
    : process.env.NEXT_PUBLIC_BASE_URL_API_IN_SERVER_SIDE;
};

const fetchInterceptor = { del, get, put, post };

export default fetchInterceptor;