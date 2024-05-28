const mongoose = require("mongoose");

const testdriveSchema = new mongoose.Schema(
    {
        userId: {
            type:String,
            required:true
        },
        date:{
            type:String,
            required: true
        },
        name: {
            type:String,
            required: true
        },
        vehicle_no:{
            type:String,
            required: true
        },
        chassis_no:{
            type:String,
            required: true
        },
        time: {
            type: Array,
            required: true
        },
        kms_in: {
            type: Number,
            required: true
        },
        kms_out: {
            type: Number,
            required:true
        },
        location: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: "pending",
        }
    },
    {
        timestamps: true,
    }
);

const testdriveModel = mongoose.model("testdrive",testdriveSchema );

module.exports = testdriveModel;


/*const mongoose = require('mongoose');

 const testdriveSchema = new mongoose.Schema(
    {    userId: {
      type:String,
      required:true
      
    },
    date:{
      type:Date,
      default: Date
       },
        name: {
              type:String,
              required: true
            },
            vehichle_no:{
                type:String,
                 required: true   
             },
             chassis_no:{
              type:String,
              required: true
             },
             time: {
                type: Array,
                required: true
              },
              kms_in: {
                type: Number,
                required: true
              },
              kms_out: {
                type: Number,
                required:true
              },
              location: {
                type: String,
                required: true
              },
              status: {
                type: String,
                default: "pending",

            }},

              {
                timestamps: true,
              }
            );
            const testdriveModel = mongoose.model("testdrives",testdriveSchema );
            module.exports = testdriveModel;*/

        