const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err);
        return res.status(401).send({
          message: "Auth failed",
          success: false,
        });
      } else {
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.log("Error in auth middleware:", error);
    return res.status(401).send({
      message: "Auth failed",
      success: false,
    });
  }
};




/*const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    try {
      const token = req.headers["authorization"].split(" ")[1];
      console.log("Token:", token); // Check if the token is being received correctly
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log("Token verification failed:", err);
          return res.status(401).send({
            message: "Auth failed",
            success: false,
          });
        } else {
          req.body.userId = decoded.id;
          next();
        }
      });
    } catch (error) {
      console.log("Error in auth middleware:", error);
      return res.status(401).send({
        message: "Auth failed",
        success: false,
      });
    }
  };
/*module.exports = async(req, res, next) =>{
   try {
    const token = req.headers["authorization"].split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if(err)
            {
                return res.status(401).send({
                    message : "Auth failed",
                    success : false
                });
            }else{
                req.body.userId = decoded.id;
                next();
            }
    });
   } catch (error) {
    return res.status(401).send({
        message : "Auth failed",
        success : false
    });
   }
};*/