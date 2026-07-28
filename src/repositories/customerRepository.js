const CustomerModel = require("../models/customerModel");

class CustomerRepository
{
    async getAll()
    {
        return CustomerModel.findAll();
    }

    async getById(id)
    {
        return CustomerModel.findById(id);
    }

    async create(customerData)
    {
        return CustomerModel.create(customerData);
    }

    async update(id, customerData)
    {
        return CustomerModel.update(id, customerData);
    }

    async delete(id)
    {
        return CustomerModel.delete(id);
    }
}

module.exports = new CustomerRepository();