const { Schema, model, SchemaType } = require("mongoose");

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
        date: {                     //We think day just allow you to set a day between mon and sun but what about the month and year????
            day: {
                type: Date,
                required: true
            },
            duration: Number // minutes
        },
        participants: {                       //Max participants of the event. How should we set it?
            type: [{
                type: Schema.Types.ObjectId,
                ref: 'User'
            }],
            maxItems: 10                      //Found this but don't really know if it's correct
        },
        departments: [{
            ref: 'Museum',                        //Museum or department reference? It's the model
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
);

eventSchema.index({ location: '2dsphere' })

const Event = model("Event", eventSchema);

module.exports = Event;