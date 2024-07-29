import mongoose from 'mongoose';


const collegeStreamSchema = new mongoose.Schema({
    streamName: {
        type: String,
        enum: ['Arts', 'Commerce', 'Science', 'HSVC'],
        required: true
    },
    streamCode: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Self-Finance', 'Un-Aided', 'Aided', 'B.M.C'],
        required: true
    },
    medium: {
        type: String,
        enum: ['English', 'Hindi', 'Gujarati', 'Kannad', 'Marathi', 'Sindhi', 'Urdu'],
        required: true
    },
    intake: {
        type: Number,
        required: true
    },
    minority: {
        type: String,
        required: true
    },
    isOfferingIT: {
        type: Boolean,
        required: true,
        default: false
    },
    bifocalSubject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BifocalSubject'
    },
    fee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeFee'
    },
    optionalSubject: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OptionalSubject'
    }],
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'College'
    },
    reservationSeats: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReservationDetails'
    }],
    cutOff: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CutOff',
        
    }],
}, {timestamps: true});



collegeStreamSchema.pre('save', async function(next){
    if(this.isModified('reservationSeats') || this.isModified('intake')){
        const ReservationDetails = mongoose.model('ReservationDetails');
        const reservations = await ReservationDetails.find({
            '_id': {$in: this.reservationSeats}
        });

        const totalOriginalSeats = reservations.reduce((sum, reservation) => sum + reservation.originalseats, 0);



        // let totalOriginalSeats = 0;
        // for(let i = 0; i < reservations.length; i++){
        //     totalOriginalSeats += reservations[i].originalseats;
        //     console.log(reservations[i]);
        // }
        // console.log( 'seats' ,totalOriginalSeats);

        if(totalOriginalSeats > this.intake){
            return next(new Error ('Total original seats in reservation cannot exceed in the intake, (CollegeStream Model)'))
        }
    };
    next()
})

const CollegeStream = mongoose.model('CollegeStream', collegeStreamSchema);

export default CollegeStream;