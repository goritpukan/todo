export const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

export const isValidEmail = (email: string): string => {
  email = email.trim();
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Email is invalid";
  return "";
}
export const isValidPassword = (password: string): string => {
  password = password.trim();
  if (!password) return "Password is required";
  if (password.length < 6) return "Password is invalid";
  return "";
}
export const isValidUsername = (username: string) => {
  username = username.trim();
  if(!username) return "Username is required";
  if(username.length < 3) return "Username is invalid";
  return "";
}