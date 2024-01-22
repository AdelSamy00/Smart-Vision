import Customers from '../models/CustomerModel.js';
import { hashString } from '../utils/index.js';
import { validateSignup } from '../Joi/Schema.js';

export const register = async (req, res, next) => {
  console.log(req.body);
  const { userName, email, password, phone, gander } = req.body;
  //validate fileds
  //Joi Validation
  /* const { error, value } = validateSignup(req.body);
  if (error) {
    console.log(error);
    res.status(500).json(error.details);
    return;
  } */
  if (!(userName && email && password && phone && gander)) {
    next('Provide Required Fields!');
    return;
  }
  try {
    const existCustomer = await Customers.findOne({ email });
    if (existCustomer) {
      next('Email Address already exists');
      return;
    }
    const hashedPassword = await hashString(password);
    const Customer = await Customers.create({
      userName,
      email,
      password: hashedPassword,
      phone,
      gander,
    });
    res.status(200).json({ message: Customer });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
