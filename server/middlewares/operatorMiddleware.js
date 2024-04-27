import JWT from 'jsonwebtoken';

const operatorAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader?.startsWith('Bearer')) {
    next('Authentication == failed');
  }
  const token = authHeader?.split(' ')[1];
  try {
    const { jobTitle } = JWT.verify(token, process.env.JWT_SECRET_KEY);
    if (jobTitle.toLowerCase() === 'operator') {
      next();
    } else {
      next('you are not operator');
    }
  } catch (error) {
    console.log(error);
    next('Authentication failed');
  }
};
export default operatorAuth;
