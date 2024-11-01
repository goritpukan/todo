export const emailRegex = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

export const isValidEmail = (email: string): boolean => {
  return emailRegex.test(email);
};