const URL = import.meta.env.VITE_API_URL;
export async function fetchUser() {
  const res = await fetch(`${URL}/api/v1/user/me`, {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user");
  }
  const data = await res.json();
  return data.user;
}

export async function signup(data) {
  const res = await fetch(`${URL}/api/v1/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      user_name: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data["confirm-password"],
    }),
  });

  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}

export async function loginUser(data) {
  const res = await fetch(`${URL}/api/v1/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}

// api/auth.js
export async function logoutUser() {
  const res = await fetch(`${URL}/api/v1/user/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to log out");
  }
}

export async function forgotPassword(email) {
  const res = await fetch(`${URL}/api/v1/user/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.email }),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}

export async function resetPassword(data) {
  const res = await fetch(`${URL}/api/v1/user/resetPassword/${data.token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message);
  }
  return result;
}
