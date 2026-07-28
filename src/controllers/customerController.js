const customerService = require("../services/customerServices");

class CustomerController
{
    async getAll(req, res)
    {
        try
        {
            const customers = await customerService.getAllCustomers();
            res.json(customers);
        }
        catch (error)
        {
            res.status(500).json({error: error.message});
        }
    }

    async getById(req, res)
    {
        try
        {
            const customer = await customerService.getCustomerById(parseInt(req.params.id));
            res.json(customer);
        }
        catch (error)
        {
            if (error.message === "Customer not found")
            {
                res.status(404).json({error: error.message});
            }
            else
            {
                res.status(500).json({error: error.message});
            }
        }
    }

    async create(req, res)
    {
        try
        {
            const customer = await customerService.createCustomer(req.body);
            res.status(201).json(customer);
        }
        catch (error)
        {
            if (error.message === "Name and email are required")
            {
                res.status(400).json({error: error.message});
            }
            else
            {
                res.status(500).json({error: error.message});
            }
        }
    }

    async update(req, res)
    {
        try
        {
            const customer = await customerService.updateCustomer(parseInt(req.params.id), req.body);
            res.json(customer);
        }
        catch (error)
        {
            if (error.message === 'Customer not found')
            {
                res.status(404).json({ error: error.message });
            }
            else
            {
                res.status(500).json({ error: error.message });
            }
        }
    }

    async delete(req, res)
    {
        try
        {
            await customerService.deleteUser(parseInt(req.params.id));
            res.status(204).send();
        }
        catch (error)
        {
            if (error.message === 'Customer not found')
            {
                res.status(404).json({ error: error.message });
            }
            else
            {
                res.status(500).json({ error: error.message });
            }
        }
    }
}

module.exports = new CustomerController();