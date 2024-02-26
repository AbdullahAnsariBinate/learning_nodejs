// const jwt = require("jsonwebtoken");
// const User = require("../modals/user");

// const validateJwtToken = async (req, res, next) => {
//   console.log("usr bJBdj", req.user);
//   let token;
//   let authHeader = req.headers.Authorization || req.headers.authorization;
//   try {
//     if (authHeader && authHeader.startsWith("Bearer")) {
//       token = authHeader.split(" ")[1];
//       console.log("tokentoken", token);
//       jwt.verify(
//         token,
//         process.env.ACCESS_TOKEN_SECRET,
//         async (err, decoded) => {
//           if (err) {
//             res
//               .status(401)
//               .json({ status: 0, message: "Token has been expired!" });
//             return;
//           }
//           req.user = decoded.user;
//           console.log("req.s", req.user);
//           const findUser = await User.findById({ _id: req.user._id });
//           if (findUser?.token !== token) {
//             res
//               .status(401)
//               .json({ message: "Unauthorized user token!", statusCode: 401 });
//             return;
//           }
//           next();
//         }
//       );
//     } else {
//       res.status(401).json({ message: "Token missing!" });
//     }
//   } catch (err) {
//     console.log("ValidateToken Error: ", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// module.exports = validateJwtToken;

const jwt = require("jsonwebtoken");
const User = require("../modals/User");
const validateToken = async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  try {
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            console.log("error", err);
            res.status(401).json({ status: false, message: "Token Expired" });
            // throw new Error("Token Expired");
            return;
          }
          req.user = decoded.user;
          const findUser = await User.findById({ _id: req.user._id });
          if (findUser?.token !== token) {
            res.status(401).json({ status: false, message: "Unauthorized" });
            return;
          }
          next();
        }
      );
    } else {
      res.status(401).json({ status: false, message: "Token Missing" });
      return;
    }
  } catch (e) {
    console.log({ e });
    res.status(401).json({ status: false, message: e.message });
  }
};
module.exports = validateToken;
