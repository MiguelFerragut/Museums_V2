const { Schema, model, SchemaType } = require("mongoose")

const eventSchema = new Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        guideName: {
            ref: 'User',
            type: Schema.Types.ObjectId
        },
        description: {
            type: String,
            required: true,
            max: 300
        },
        cover: {
            type: String,
            set: string => string === '' ? 'https://www.nicepng.com/png/detail/125-1257327_events-icon-website-gray-events-icon-png-black.png' : string
        },
        location: {
            type: {
                type: String,
                required: true
            },
            coordinates: [Number],
        },
        date: {
            day: {
                type: Date,
                required: true
            },
            duration: Number
        },
        participants: {
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'User'
            }],
            maxItems: 10
        },
        departments: [{
            ref: 'Department',
            type: Schema.Types.ObjectId
        }],
        language: {
            type: String,
            enum: ['ENGLISH', 'SPANISH', 'FRENCH'],
            default: 'ENGLISH'
        }
    },
    {
        timestamps: true
    }
)

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema)

module.exports = Event 