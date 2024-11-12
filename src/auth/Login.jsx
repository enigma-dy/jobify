import axios from "axios";

export const Login = async (email, password) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/api/v1/user/login",
      {
        email: email,
        password: password,
      }
    );
    const { token, user } = response.data;

    localStorage.setItem("jobify_user_token", token);
    localStorage.setItem("jobify_user", JSON.stringify(user));

    return user;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};
