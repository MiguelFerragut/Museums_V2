const { Schema, model, SchemaType } = require("mongoose");

const museumSchema = new Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        description: {
            type: String,
            required: true,
            max: 300
        },
        cover: {
            type: String,
            set: string => string === '' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/BSicon_MUSEUM.svg/1200px-BSicon_MUSEUM.svg.png' : string
        },
        location: {
            type: {
                type: String,
                required: true
            },
            coordinates: [Number]
        },
        departments: [{
            type: Schema.Types.ObjectId,
            ref: 'Department'
        }]
    },
    {
        timestamps: true
    }
);

museumSchema.index({ location: '2dsphere' })

const Museum = model("Museum", museumSchema);

module.exports = Museum;