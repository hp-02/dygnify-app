const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const viewpath = __dirname + '/views/';
app.use(express.static(viewpath));

// mongodb://localhost:27017/dygnify-form
// `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.2a2mc.mongodb.net/dygnify-form`
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.2a2mc.mongodb.net/dygnify-form`)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));

const Form = require("./models/form.model");

app.post("/submit", async function (req, res) {
    let result = true;
    const { first_name, last_name, age, phone, business_name, gst_no, address, loan_amount, interest_rate, loan_tenure } = req.body;
    if (!first_name || first_name === "") result = false;
    if (!last_name || last_name === "") result = false;
    if (!age || age < 21 || age > 65) result = false;
    if (!phone || phone.length !== 10) result = false;
    if (!business_name || business_name === "") result = false;
    if (!gst_no || !/[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}/.test(gst_no))
        result = false;
    if (!address || address === "") result = false;
    if (!loan_amount || loan_amount < 10000) result = false;
    if (!interest_rate || interest_rate < 1 || interest_rate > 20) result = false;
    if (!loan_tenure || loan_tenure < 6 || loan_tenure > 36) result = false;
    if (result) {
        Form.create(req.body, function (err, docs) {
            if (err) return res.status(400).send({ msg: "Please validate all the field" });
            return res.status(200).send({ msg: "Submitted successfully" });
        });
    } else {
        return res.status(400).send({ msg: "Please validate all the field" });
    }

});

app.listen(8080, function () {
    console.log("Server running on port 8080");
});