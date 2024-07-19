import mongoose from "mongoose";

const reservationCategoryEnum = [
    'SC', 'ST', 'VJA', 'NTB', 'NTC', 'NTD', 'OBC', 'SBC', 'SEBC', 'EWS', 
    'Minority', 'Management', 'InHouse', 'General'
];

const reservationDetailsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: {
            values: reservationCategoryEnum,
            message: '{values} is not a valid reservation category'
        }
    },
    percentage: {
        type: Number,
        // required: [true, 'Percentage is required'],
        min: [0, 'Percentage cannot be negative'],
        max: [100, 'Percentage cannot exceed 100'],
        validate: {
            validator: Number.isFinite,
             message: '{VALUE} is not a valid percentage'
        }
    },
    originalseats: {
        type: Number,
        required: [true, 'Original seats count is required'],
        min: [0, 'Original seats cannot be negative'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not a valid integer for original seats'
        }
    },
    reservations: {
        tfLlbFis: {
            type: Number,
            default: 0,
            min: [0, 'TF/LLB/FIS reservation cannot be negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not a valid integer for TF/LLB/FIS reservation'
            }
        },
        projectEarthquakeAffected: {
            type: Number,
            default: 0,
            min: [0, 'Project/Earthquake affected reservation cannot be negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not a valid integer for Project/Earthquake affected reservation'
            }
        },
        orphan: {
            type: Number,
            default: 0,
            min: [0, 'Orphan reservation cannot be negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not a valid integer for orphan reservation'
            }
        },
        ph: {
            type: Number,
            default: 0,
            min: [0, 'PH reservation cannot be negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not a valid integer for PH reservation'
            }
        },
        women: {
            type: Number,
            default: 0,
            min: [0, 'Women reservation cannot be negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not a valid integer for women reservation'
            }
        },
        balanceForConstRsv: {
            type: Number,
            required: [true, 'Balance for constitutional reservation is required'],
            min: [0, 'Balance for constitutional reservation cannot be negative'],
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not a valid integer for balance for constitutional reservation'
            }
        },
    },
    stream: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeStream',
        required: [true, 'College stream reference is required']
    }
}, {timestamps: true});

// Virtual for total reservations

reservationDetailsSchema.virtual('totalReservations').get(function(){
    const {tfLlbFis, projectEarthquakeAffected, orphan, ph, women, balanceForConstRsv} = this.reservations;
    return tfLlbFis + projectEarthquakeAffected + orphan + ph + women + balanceForConstRsv;
});

reservationDetailsSchema.pre('save', async function(next){
    if(this.isModified('originalseats') || this.isModified('reservations')){
        const totalReservations = this.totalReservations;
        if(this.originalseats < totalReservations){
            return next(new Error('Total reservation cannot be exceed originalSeats (ReservationDetails Model)'))
        };

        //Fetch the corresponding stream to get the intake

        const stream = await mongoose.model('CollegeStream').findById(this.stream);
       
        if(!stream){
            return next(new Error('Stream not found'))
        };
        if(this.originalseats > stream.intake){
            return next(new Error('Intake not match'))
        }
        // console.log(stream.intake);
        //Calculate the percentage
        this.percentage = (this.originalseats / stream.intake) * 100;

        next();
    }
});

const ReservationDetails = mongoose.model('ReservationDetails', reservationDetailsSchema);

export default ReservationDetails;