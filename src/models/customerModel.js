let customers = [
    {
        id: 1,
        name: "Adam Smith",
        email: "AdamS@email.com"
    },
    {
        id: 2,
        name: "Betty Grof",
        email: "GrofBetty@email.com"
    }
];

let nextId = 3;


class CustomerModel
{
    static findAll()
    {
        return customers;
    }

    static findById(id)
    {
        return customers.find(customer => customer.id === id);
    }

    static create(customerData)
    {
        const customer = {
            id: nextId++,
            ...customerData
        };

        customer.push(customer);
        return customer;
    }

    static update(id, customerData)
    {
        const index = customers.findIndex(customer => customer.id === id);
        if (index === -1)
        {
            return null;
        }

        customers[index] = {
            ...customers[index],
            ...customerData
        };
        return customers[index];
    }

    static delete(id)
    {
        const index = customers.findIndex(customer => customer.id === id);
        if (index === -1)
        {
            return false;
        }

        customers.splice(index, 1);
        return true;
    }
}

module.exports = CustomerModel;










