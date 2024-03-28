import ContactUs from '../models/ContactUs.js';
import Customers from '../models/CustomerModel.js';
import Verifications from '../models/EmailVerification.js';
import Orders from '../models/OrderModel.js';
import Products from '../models/ProductModel.js';
import Reviews from '../models/Review.js';
import ServicesOrders from '../models/ServiceOrder.js';
import Employees from '../models/Employee.js';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

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
    const { username, email, password, jobTitle } = req.body; // Assuming employee details are passed in the request body

    // Check if the email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Check if the password meets minimum length requirement
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
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
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds, you can adjust as needed

    // Create a new employee instance with the hashed password
    const newEmployee = new Employees({
      username: username,
      email: email,
      password: hashedPassword, // Store the hashed password
      jobTitle: jobTitle,
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

// Function to validate email format
function validateEmail(email) {
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}

export const updateEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.body; // Assuming employee ID is passed in the request params
    const { username, email, password, jobTitle } = req.body; // Assuming updated employee details are passed in the request body

    // Check if the email is valid
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
    }

    // Check if the password meets the minimum length requirement
    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Find the employee by ID
    const employee = await Employees.findById(employeeId);

    // If employee not found
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
      });
    }

    // Update employee details
    employee.username = username;
    employee.email = email;
    employee.jobTitle = jobTitle;

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      employee.password = hashedPassword;
    }

    // Save the updated employee to the database
    await employee.save();

    res.status(200).json({
      success: true,
      message: 'Employee updated successfully',
      employee: employee,
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
    // Retrieve all employees from the database
    const employees = await Employees.find();

    res.status(200).json({
      success: true,
      message: 'Employees retrieved successfully',
      employees: employees,
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
    const { employeeId } = req.params; // Extracting the employee ID from the request parameters

    // Find the employee by ID
    const employee = await Employees.findById(employeeId);

    // If employee not found
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

export const deleteEmployeeById = async (req, res, next) => {
  try {
    const { employeeId } = req.body; // Extracting the employee ID from the request parameters

    // Find the employee by ID and delete
    const deletedEmployee = await Employees.findByIdAndDelete(employeeId);

    // If employee not found
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

