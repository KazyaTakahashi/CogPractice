const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, "../../atlas-credentials.env") });

const mongoUri = process.env.MONGODB_URI || "mongodb+srv://<db_username>:<db_password>@cognixia.3nnb1qc.mongodb.net/?appName=Cognixia";

mongoose.connect(mongoUri, {
    dbName: "BankApp"
})
.then(() => console.log("MongoDB connected"))
.catch((error) => console.error("MongoDB connection error:", error));

const customerSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
}, {
    timestamps: true
});

const Customer = mongoose.model("Customer", customerSchema);

class CustomerModel
{
    static async findAll()
    {
        return Customer.find().sort({ id: 1 });
    }

    static async findById(id)
    {
        return Customer.findOne({ id: Number(id) });
    }

    static async create(customerData)
    {
        const latestCustomer = await Customer.findOne().sort({ id: -1 }).select("id");
        const nextId = latestCustomer && latestCustomer.id ? latestCustomer.id + 1 : 1;

        return Customer.create({
            id: nextId,
            ...customerData
        });
    }

    static async update(id, customerData)
    {
        return Customer.findOneAndUpdate(
            { id: Number(id) },
            { $set: customerData },
            { new: true, runValidators: true }
        );
    }

    static async delete(id)
    {
        const deletedCustomer = await Customer.findOneAndDelete({ id: Number(id) });
        return Boolean(deletedCustomer);
    }
}

module.exports = CustomerModel;