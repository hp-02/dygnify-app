const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema({
    first_name: {
        type: String,
        default: ""
    },
    last_name: {
        type: String,
        default: ""
    },
    age: {
        type: String,
        default: "18"
    },
    phone: {
        type: String,
        default: ""
    },
    business_name: {
        type: String,
        default: ""
    },
    gst_no: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    loan_amount: {
        type: String,
        default: "10000"
    },
    interest_rate: {
        type: String,
        default: "15"
    },
    loan_tenure: {
        type: String,
        default: "6"
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const Form = mongoose.model("Form", FormSchema);

module.exports = Form;