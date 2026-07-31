import { useEffect, useState } from "react";
import { fetchWithAuth } from "../lib/authApi";

function Services() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ name: "", email: "" });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "" });

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth("/api/customers");
      if (!response.ok) {
        throw new Error("Unable to load customers");
      }
      const data = await response.json();
      setCustomers(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const startEdit = (customer) => {
    setEditingId(customer.id);
    setDraft({ name: customer.name, email: customer.email });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setDraft({ name: "", email: "" });
  };

  const saveEdit = async (id) => {
    try {
      const response = await fetchWithAuth(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });

      if (!response.ok) {
        throw new Error("Unable to update customer");
      }

      await loadCustomers();
      cancelEdit();
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const response = await fetchWithAuth(`/api/customers/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Unable to delete customer");
      }
      await loadCustomers();
    } catch (err) {
      setError(err.message);
    }
  };

  const addCustomer = async () => {
    try {
      const response = await fetchWithAuth("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer)
      });

      if (!response.ok) {
        throw new Error("Unable to add customer");
      }

      await loadCustomers();
      setShowAddForm(false);
      setNewCustomer({ name: "", email: "" });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <h2>Customer services</h2>
          <p>View, update, and manage your client records from one dashboard.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowAddForm((prev) => !prev)}>
          {showAddForm ? "Close" : "Add"}
        </button>
      </div>
      {error ? <div className="status-message">{error}</div> : null}
      {showAddForm ? (
        <div className="form-card" style={{ marginBottom: "1rem" }}>
          <div className="form-grid">
            <input
              placeholder="Name"
              value={newCustomer.name}
              onChange={(event) => setNewCustomer({ ...newCustomer, name: event.target.value })}
            />
            <input
              placeholder="Email"
              value={newCustomer.email}
              onChange={(event) => setNewCustomer({ ...newCustomer, email: event.target.value })}
            />
            <div className="hero-actions">
              <button className="btn-primary" onClick={addCustomer}>Save customer</button>
              <button className="btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : null}
      {loading ? (
        <p>Loading customers…</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  {editingId === customer.id ? (
                    <input
                      value={draft.name}
                      onChange={(event) => setDraft({ ...draft, name: event.target.value })}
                    />
                  ) : (
                    customer.name
                  )}
                </td>
                <td>
                  {editingId === customer.id ? (
                    <input
                      value={draft.email}
                      onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                    />
                  ) : (
                    customer.email
                  )}
                </td>
                <td>
                  {editingId === customer.id ? (
                    <div className="hero-actions">
                      <button className="btn-primary" onClick={() => saveEdit(customer.id)}>Save</button>
                      <button className="btn-secondary" onClick={cancelEdit}>Cancel</button>
                    </div>
                  ) : (
                    <button className="btn-edit" onClick={() => startEdit(customer)}>Update</button>
                  )}
                </td>
                <td>
                  <button className="btn-danger" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default Services;
