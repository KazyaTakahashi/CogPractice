const mongoose = require("mongoose");
const connectDatabase = require("../config/db");

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
        await connectDatabase();
        return Customer.find().sort({ id: 1 });
    }

    static async findById(id)
    {
        await connectDatabase();
        return Customer.findOne({ id: Number(id) });
    }

    static async create(customerData)
    {
        await connectDatabase();
        const latestCustomer = await Customer.findOne().sort({ id: -1 }).select("id");
        const nextId = latestCustomer && latestCustomer.id ? latestCustomer.id + 1 : 1;

        return Customer.create({
            id: nextId,
            ...customerData
        });
    }

    static async update(id, customerData)
    {
        await connectDatabase();
        return Customer.findOneAndUpdate(
            { id: Number(id) },
            { $set: customerData },
            { new: true, runValidators: true }
        );
    }

    static async delete(id)
    {
        await connectDatabase();
        const deletedCustomer = await Customer.findOneAndDelete({ id: Number(id) });
        return Boolean(deletedCustomer);
    }
}

module.exports = CustomerModel;