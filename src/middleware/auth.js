import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return req.status(401).json({ message: "user is not authenticated" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "user is not authenticated" });
    }

    return next();
  });
};

export default authUser;
