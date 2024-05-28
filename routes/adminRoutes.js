const express =require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const testdriveModel = require('../models/testdriveModel');
const router = express.Router();
const usermodel = require('../models/usermodel');
//GET USERS
router.get('/get-all-users', authMiddleware, async(req, res) =>{
    try {
        const users = await testdriveModel.find({});
      res.status(200).send({
        message: "Users fetched successfully",
        success: true,
        data: users,
      }) 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Error fetching users',
            success:false,
            error
        });
    }
});

router.post('/change-testdrive-status', authMiddleware, async(req, res) =>{
  try {
      const{ testdriveId, status} = req.body;
      const testdrive = await testdriveModel.findByIdAndUpdate(testdriveId,{status});
   /* res.status(200).send({
      message: "Status updated succesfully",
      success: true,
      data: testdrive,
    })*/ 
    const user =await usermodel.findOne({_id: testdrive.userId});
    const unseenNotification = user.unseenNotification;
     unseenNotification.push({
        type: "new-testdrive-request-changed",
        message: `${testdrive.name}  test drive status is ${status}`,
         onClickPath : "/notifications",
     })
     await usermodel.findByIdAndUpdate(user._id, { unseenNotification });
      

     res.status(200).send({
      message: "status updated successfully",
      success: true,
      data: testdrive,
     })
  } catch (error) {
      console.log(error);
      res.status(500).send({
          message: 'Status updation failed',
          success:false,
          error
      });
  }
});

module.exports = router;