const mongoose = require('mongoose');

const RequestPledgeSchema = new mongoose.Schema(
    {
        donorID: {
            type: String,
            required: [true, 'Donor ID must be provided']
        },
        requestID: {
            type: String,
            required: [true,'Request ID must be provided']
        },
    }
)

module.exports = mongoose.model('RequestPledge',RequestPledgeSchema)