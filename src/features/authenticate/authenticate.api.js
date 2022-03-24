export const login = async (params) => {
  let response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(params),
  });
  let data = await response.json();
  return { data };
};

export const loginCheck = async (params) => {
  let response = await fetch("http://localhost:8000/auth/login/check", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      accesstoken: `Bearer ${params.accesstoken}`,
    },
  });
  let data = await response.json();
  return { data };
};

export const logout = async () => {
  let response = await fetch("http://localhost:8000/auth/logout", {
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    },
  });
  let data = await response.json();
  return { data };
};
