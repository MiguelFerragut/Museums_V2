const { Schema, model } = require("mongoose");

const departmentSchema = new Schema(
    {
        name: {
            type: String,
        },
        reference: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const Department = model("Department", departmentSchema);

module.exports = Department;