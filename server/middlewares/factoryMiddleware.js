import JWT from 'jsonwebtoken';

const factoryAuth = async (req, res, next) => {
  const authHeader = req?.headers?.authorization;
  if (!authHeader || !authHeader?.startsWith('Bearer')) {
    next('Authentication == failed');
  }
  const token = authHeader?.split(' ')[1];
  try {
    const employeeJobTitle = JWT.verify(token, process.env.JWT_SECRET_KEY);
    if (employeeJobTitle.toLowerCase() === 'factory') {
      next();
    } else {
      next('you are not factory');
    }
  } catch (error) {
    console.log(error);
    next('Authentication failed');
  }
};
export default factoryAuth;
