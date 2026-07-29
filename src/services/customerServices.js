const customerRepository = require("../repositories/customerRepository");

class CustomerService
{
    async getAllCustomers()
    {
        return await customerRepository.getAll();
    }

    async getCustomerById(id)
    {
        const customer = await customerRepository.getById(id);
        if (!customer)
        {
            throw new Error("Customer not found");
        }
        return customer;
    }

    async createCustomer(customerData)
    {
        if (!customerData.name || !customerData.email)
        {
            throw new Error("Name and email are required");
        }
        return await customerRepository.create(customerData);
    }

    async updateCustomer(id, customerData)
    {
        const customer = await customerRepository.update(id, customerData);
        if (!customer)
        {
            throw new Error("Customer not found");
        }
        return customer;
    }

    async deleteUser(id)
    {
        const deleted = await customerRepository.delete(id);
        if (!deleted)
        {
            throw new Error("Customer not found");
        }
        return deleted;
    }
}

module.exports = new CustomerService();