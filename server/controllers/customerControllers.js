import Customers from '../models/CustomerModel.js';
import Verifications from '../models/EmailVerification.js';
import { compareString, createJWT, hashString } from '../utils/index.js';

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
