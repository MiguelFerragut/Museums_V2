const { Schema, model } = require("mongoose")

const countrySchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Country = model("Country", countrySchema)

module.exports = Country 