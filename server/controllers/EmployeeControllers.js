import ContactUs from '../models/ContactUs.js';
import Customers from '../models/CustomerModel.js';
import Verifications from '../models/EmailVerification.js';
import Orders from '../models/OrderModel.js';
import Products from '../models/ProductModel.js';
import Reviews from '../models/Review.js';
import ServicesOrders from '../models/ServiceOrder.js';
import Employees from '../models/Employee.js';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import jwt from 'jsonwebtoken';

export const getAllCustomers = async (req, res, next) => {
  const customers = await Customers.find({}).select('-password');
  res.status(200).json({
    success: true,
    message: 'get data successfully',
    customers,
  });
};

export const deleteReview = async (req, res, next) => {
  try {
    const { customerId, reviewId, productId } = req.body;
    console.log(customerId, reviewId, productId);
    const review = await Reviews.findById({ _id: reviewId });
    const product = await Products.findById({ _id: productId }).populate(
      'reviews'
    );
    if (String(review.customer) === customerId) {
      //delete review from product
      product.reviews = product.reviews.filter(
        (pid) => String(pid._id) !== String(review._id)
      );
      //Calculate totalRating
      product.totalRating = await calculateTotalRating(product.reviews);
      const newProductData = await Products.findByIdAndUpdate(
        { _id: productId },
        product,
        {
          new: true,
        }
      );
      const deletedReview = await Reviews.findOneAndDelete({ _id: reviewId });
      res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
        deletedReview,
        newProductData: newProductData,
        totalRating: product.totalRating,
      });
    } else {
      next('you are unauthorized to remove this review');
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'failed to delete review',
    });
  }
};

export const getCustomizationOrders = async (req, res, next) => {
  try {
    const customizationOrders = await ServicesOrders.find({
      service: 'Customization Service',
    }).populate([
      {
        path: 'customer',
        select: '-password',
      },
      {
        path: 'assignedEngineer',
        select: '_id username email -password',
      },
    ]);
    res.status(200).json({
      success: true,
      message: 'get customization orders successfully',
      customizationOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServiceById = async (req, res, next) => {
  try {
    const { serviceId } = req.params;
    const service = await ServicesOrders.find({ _id: serviceId }).populate([
      {
        path: 'customer',
        select: '_id username email gender phone verified address -password',
      },
      {
        path: 'assignedEngineer',
        select: '_id username email -password',
      },
    ]);

    if (!service || service.length === 0) {
      next('No service orders found');
      return;
    }
    res.status(200).json({
      success: true,
      message: 'found successfully',
      service,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'this service not found',
    });
  }
};
export const addEmployee = async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, gender, jobTitle, image, qualification, birthday, salary } = req.body;

    // Check if the email is provided and it's valid
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Check if the password meets the length requirement
    if (!password || password.length < 7) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 7 characters long',
      });
    }

    // Check if the email is already registered
    const existingEmployee = await Employees.findOne({ email: email });
    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: 'Email is already registered',
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new employee instance
    const newEmployee = new Employees({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: hashedPassword, // Store the hashed password
      gender: gender,
      jobTitle: jobTitle,
      image: image,
      qualification: qualification,
      birthday: birthday,
      salary: salary,
    });

    // Save the new employee to the database
    await newEmployee.save();

    res.status(201).json({
      success: true,
      message: 'Employee added successfully',
      employee: newEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to add employee',
    });
  }
};

export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.body; // Assuming the employee ID is passed as a parameter in the URL
    const { firstName, lastName, username, email, password, gender, jobTitle, image, qualification, birthday, salary } = req.body;

    // Check if the email is provided and it's valid
    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Check if the password meets the length requirement
    if (password && password.length < 7) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 7 characters long',
      });
    }

    // Check if the employee with the given ID exists
    const existingEmployee = await Employees.findById(id);
    if (!existingEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Update employee fields
    existingEmployee.firstName = firstName;
    existingEmployee.lastName = lastName;
    existingEmployee.username = username;
    existingEmployee.email = email;
    existingEmployee.gender = gender;
    existingEmployee.jobTitle = jobTitle;
    existingEmployee.image = image;
    existingEmployee.qualification = qualification;
    existingEmployee.birthday = birthday;
    existingEmployee.salary = salary;

    // Hash and update the password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingEmployee.password = hashedPassword;
    }

    // Save the updated employee to the database
    await existingEmployee.save();

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee: existingEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to update employee',
    });
  }
};

export const getAllEmployees = async (req, res, next) => {
  try {
    // Query the database to get all employees
    const allEmployees = await Employees.find();

    res.status(200).json({
      success: true,
      message: 'All employees retrieved successfully',
      employees: allEmployees,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve employees',
    });
  }
};
export const getEmployeeById = async (req, res, next) => {
  try {
    const { id } = req.params; // Assuming the employee ID is passed as a parameter in the URL

    // Query the database to find the employee by ID
    const employee = await Employees.findById(id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee retrieved successfully',
      employee: employee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve employee',
    });
  }
};

export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.body; // Assuming the employee ID is passed as a parameter in the URL

    // Find the employee by ID and delete it
    const deletedEmployee = await Employees.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Employee deleted successfully',
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete employee',
    });
  }
};

