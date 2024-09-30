export const jwtConstants = {
  // generate a random string with 32 characters using this command:
  // openssl rand -base64 32 | tr -d '/+' | cut -c1-32 | tr -d '=' | tr -d ' '
  secret: process.env.JWT_SECRET,
};
