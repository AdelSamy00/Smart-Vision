import Customers from '../models/CustomerModel.js';
import { compareString, createJWT, hashString } from '../utils/index.js';
import { validateSignup } from '../Joi/Schema.js';
import { sendVerificationEmail } from '../utils/sendEmail.js';

export const register = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, phone, gender } = req.body;
  //validate fileds
  //Joi Validation
  /* const { error, value } = validateSignup(req.body);
  if (error) {
    console.log(error);
    res.status(500).json(error.details);
    return;
  }  */
  console.log(req);
  if (!(username && email && password && phone && gender)) {
    next('Provide Required Fields!');
    return;
  }
  try {
    const existCustomer = await Customers.findOne({ email });
    if (existCustomer) {
      next('Email Address already exists');
      return;
    }
    const existCustomerByPhone = await Customers.findOne({ phone });
    if (existCustomerByPhone) {
      next('Phone already exists');
      return;
    }
    const hashedPassword = await hashString(password);
    const Customer = await Customers.create({
      username,
      email,
      password: hashedPassword,
      phone,
      gender,
    });
    // send email Verification to user and add them to emailVerification.
    sendVerificationEmail(Customer, res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    next('please Provide User Credentials');
    return;
  }
  // find user by email
  const customer = await Customers.findOne({ email }).select('+password');

  if (!customer) {
    next('Invalid email or password');
    return;
  }
  if (!customer?.verified) {
    next(
      'customer email is not verified. Check your email account and verify your email'
    );
    return;
  }
  //compare password
  const isMatch = await compareString(password, customer?.password);
  if (!isMatch) {
    next('Invalid email or password');
    return;
  }
  customer.password = undefined;
  const token = createJWT(customer._id);
  res.cookie('token', token, {
    httpOnly: true,
    //secure: true,
    //maxAge: 86400,
    signed: true,
  });
  res.status(200).json({
    success: true,
    message: 'login successfully',
    customer,
    token,
  });
};
