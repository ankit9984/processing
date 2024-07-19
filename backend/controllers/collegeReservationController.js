import ReservationDetails from "../models/collegeReservationDetails.Model.js";
import CollegeStream from "../models/collegeStream.model.js";

const createReservation = async (req, res) => {
    try {
        const {streamId} = req.params;
        
        const {category,percentage, originalseats , reservations: {tfLlbFis, projectEarthquakeAffected, orphan, ph, women, balanceForConstRsv}} = req.body;
        console.log(category);
        const stream = await CollegeStream.findById(streamId);
        if(!stream){
            return res.status(400).json({error: 'Stream is not found'})
        };

        const newReservations = new ReservationDetails({
            category,
            percentage,
            originalseats,
            reservations: {
                tfLlbFis,
                projectEarthquakeAffected,
                orphan,
                ph,
                women,
                balanceForConstRsv
            },
            stream: streamId
        });
        
        await newReservations.save();
          
        stream.reservationSeats.push(newReservations._id);
        await stream.save();

        res.status(200).json({message: 'Seats added successfully', newReservations});
    } catch (error) {
        console.error('createReservation controller', error.message);
        res.status(500).json({message: error.message})
    }
};


const udpateReservation = async (req, res) => {
    try {
        const {reservationSeatId} = req.params;
        const {category,percentage, originalseats , reservations: {tfLlbFis, projectEarthquakeAffected, orphan, ph, women, balanceForConstRsv}} = req.body;

        const seats = await ReservationDetails.findById(reservationSeatId);
        if(!seats){
            return res.status(400).json({error: 'Seats not found'})
        };

        seats.category = category || seats.category;
        seats.percentage = percentage || seats.percentage;
        seats.originalseats = originalseats || seats.originalseats;
        seats.reservations = {
            tfLlbFis: tfLlbFis || seats.reservations.tfLlbFis,
            projectEarthquakeAffected: projectEarthquakeAffected || seats.reservations.projectEarthquakeAffected,
            orphan: orphan || seats.reservations.orphan,
            ph: ph || seats.reservations.ph,
            women: women || seats.reservations.women,
            balanceForConstRsv: balanceForConstRsv || seats.reservations.balanceForConstRsv
        };

        await seats.save();
        res.status(200).json({message: 'Reservation seats updated successfully', updatedSeats: seats});
    } catch (error) {
        console.error('updateReservation controller', error.message);
        res.status(500).json({message: error.message});
    }
}

const getReservation = async (req, res) => {
    try {
        const {seatId} = req.params;

        const seats = await ReservationDetails.findById(seatId);
        if(!seats){
            return res.status(400).json({error: 'Seat is not found'})
        };

        res.status(200).json({message: 'Seats retrieved successfully', seats})
    } catch (error) {
        console.error('getReservation controller', error.message);
        res.status(500).json({message: error.message})
    }
}


export {
    createReservation,
    udpateReservation,
    getReservation
}