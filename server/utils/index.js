import bcrybt from 'bcryptjs';
import JWT from 'jsonwebtoken';

export const hashString = async (useValue) => {
  const salt = await bcrybt.genSalt(10);
  const hashedPassword = await bcrybt.hash(useValue, salt);
  return hashedPassword;
};
export const compareString = async (userPassword, password) => {
  const isMatch = await bcrybt.compare(userPassword, password);
  return isMatch;
};

// Json WebToken
export function createJWT(id) {
  return JWT.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });
}
