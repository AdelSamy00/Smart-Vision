import ContactUs from '../models/ContactUs.js';
import Customers from '../models/CustomerModel.js';
import Verifications from '../models/EmailVerification.js';
import Products from '../models/ProductModel.js';
import { compareString, createJWT, hashString } from '../utils/index.js';
import JWT from 'jsonwebtoken';

export const verifyEmail = async (req, res, next) => {
  const { customerId, token } = req.params;
  try {
    const result = await Verifications.findOne({ customerId });
    if (result) {
      const { expiresAt, token: hashedToken } = result;
      // token has expires
      if (expiresAt < Date.now()) {
        Verifications.findOneAndDelete({ customerId })
          .then(() => {
            Customers.findOneAndDelete({ _id: customerId })
              .then(() => {
                const message = 'Verification token has expired';
                res.redirect(
                  `/customers/verified?status=error&message=${message}`
                );
              })
              .catch((err) => {
                res.redirect(`/customers/verified?status=error&message=`);
              });
          })
          .catch((error) => {
            console.log(error);
            res.redirect(`/customers/verified?message=`);
          });
      } else {
        // token Valid
        compareString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) {
              Customers.findOneAndUpdate(
                { _id: customerId },
                { verified: true }
              )
                .then(() => {
                  Verifications.findOneAndDelete({ customerId }).then(() => {
                    const message = 'Email verified successfully';
                    res.redirect(
                      `/customers/verified?status=success&message=${message}`
                    );
                  });
                })
                .catch((err) => {
                  console.log(err);
                  const message = 'verification faild or link is invalid(1)';
                  res.redirect(
                    `/customers/verified?status=error&message=${message}`
                  );
                });
            } else {
              // invalid token
              const message = 'verification faild or link is invalid(2)';
              res.redirect(
                `/customers/verified?status=error&message=${message}`
              );
            }
          })
          .catch((err) => {
            console.log(err);
            res.redirect(`/customers/verified?message=(3)`);
          });
      }
    } else {
      const message = 'Invalid verification link. Try again later.(4)';
      res.redirect(`/customers/verified?status=error&message=${message}`);
    }
  } catch (error) {
    console.log(error);
    res.redirect(`/customers/verified?message=(5)`);
  }
};

export const getCustomer = async (req, res, next) => {
  const { token } = req.params;
  const { id } = req.params;
  const { customerId } = JWT.verify(token, process.env.JWT_SECRET_KEY);
  console.log(customerId);
  const customer = await Customers.findById({ _id: customerId }).select(
    '-password'
  );
  res.status(200).json({
    success: true,
    message: 'get data successfully',
    customer,
  });
};

export const saveContactMesseage = async (req, res, next) => {
  try {
    const data = req.body;
    const contact = await ContactUs.create({ ...data });
    res.status(200).json({
      success: true,
      message: 'send successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'failed to send feedback',
    });
  }
};

export const deleteAcount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const wantedCustomer = await Customers.findById({ _id: id });
    if (wantedCustomer) {
      await Customers.findByIdAndDelete({ _id: id });
      res.status(200).json({
        success: true,
        message: 'deleted successfully',
        wantedCustomer,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'user is not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: 'failed to update',
    });
  }
};

export const getAllCustomers = async (req, res, next) => {
  const customers = await Customers.find({}).select('-password');
  res.status(200).json({
    success: true,
    message: 'get data successfully',
    customers,
  });
};

export const changePassword = async (req, res, next) => {
  try {
    const { id, oldPassword, newPassword } = req.body;
    if (!id || !oldPassword || !newPassword) {
      next('Provide Required Fields!');
      return;
    }
    const wantedCustomer = await Customers.findById({ _id: id });
    console.log(wantedCustomer);
    const isMatch = await compareString(oldPassword, wantedCustomer?.password);
    if (!isMatch) {
      next('Invalid old password');
      return;
    }
    const hashedNewPassword = await hashString(newPassword);
    await Customers.findByIdAndUpdate(
      { _id: id },
      {
        password: hashedNewPassword,
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: 'updated password successfully',
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'failed to change password',
    });
  }
};

export const makeFavorite = async (req, res, next) => {
  try {
    const { id, productId } = req.body;
    const customer = await Customers.findById({ _id: id });
    const product = await Products.findById({ _id: productId });
    const index = product.likes.findIndex((pid) => pid === String(id));
    if (index === -1) {
      product.likes.push(customer._id);
      customer.favoriteList.push(product._id);
    } else {
      //unfavorite
      customer.favoriteList = customer.favoriteList.filter(
        (pid) => String(pid._id) !== String(product._id)
      );
      product.likes = product.likes.filter(
        (pid) => pid !== String(customer._id)
      );
    }
    const newProductData = await Products.findByIdAndUpdate(
      { _id: productId },
      product,
      {
        new: true,
      }
    );
    const newCustomerData = await Customers.findByIdAndUpdate(
      { _id: id },
      customer,
      {
        new: true,
      }
    );
    res.status(200).json({
      success: true,
      message: 'successfully',
      newCustomerData,
      newProductData,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'failed to make it favorite',
    });
  }
};

export const getFavoriteList = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Customers.findById({ _id: id })
      .populate('favoriteList')
      .then((customer) => {
        const favorite = customer.favoriteList;
        res.status(200).json({
          success: true,
          message: 'get favorite successfully',
          favorites: favorite,
        });
      })
      .catch(() => {
        res.status(404).json({
          success: false,
          message: 'customer is not found',
        });
      });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'failed to get your favorite',
    });
  }
};
