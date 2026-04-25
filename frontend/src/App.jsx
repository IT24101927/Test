import { useEffect, useState } from 'react';
import { API_URL } from './api';

const emptyForm = {
  name: '',
  category: '',
  price: '',
  quantity: '',
  description: '',
  isAvailable: true,
  supplierName: ''

  // LAB TEST PRACTICE:
  // Add your new frontend field here, for example:
  // supplierName: ''
};

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  async function fetchItems() {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(API_URL);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch items');
      }

      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!form.name.trim() || !form.category.trim()) {
      setError('Name and category are required');
      return;
    }

    if (Number(form.price) < 0 || Number(form.quantity) < 0) {
      setError('Price and quantity cannot be negative');
      return;
    }

    const payload = {
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity)
    };

    try {
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
      }

      setMessage(editingId ? 'Item updated successfully' : 'Item added successfully');
      setForm(emptyForm);
      setEditingId(null);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(item) {
    setEditingId(item._id);
    setForm({
      name: item.name || '',
      category: item.category || '',
      price: item.price ?? '',
      quantity: item.quantity ?? '',
      description: item.description || '',
      isAvailable: item.isAvailable ?? true,
      supplierName: item.supplierName || ''

      // LAB TEST PRACTICE:
      // Add your new field here too, for example:
      // supplierName: item.supplierName || ''
    });
    setMessage('');
    setError('');
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setMessage('');
    setError('');
  }

  async function handleDelete(id) {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');

    if (!confirmDelete) return;

    try {
      setMessage('');
      setError('');
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Delete failed');
      }

      setMessage('Item deleted successfully');
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="page">
      <header className="header">
        <p className="eyebrow">SE2020 WMT Lab Test Practice</p>
        <h1>MERN Item Manager</h1>
        <p>
          Practice a separate React frontend, Express backend, MongoDB Atlas connection,
          GitHub push, and deployment.
        </p>
      </header>

      <main className="layout">
        <section className="card">
          <h2>{editingId ? 'Update Item' : 'Add New Item'}</h2>

          <form onSubmit={handleSubmit} className="form">
            <label>
              Item Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Example: Laptop"
                required
              />
            </label>

            <label>
              Category
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Example: Electronics"
                required
              />
            </label>

            <label>
              Price
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Example: 150000"
                min="0"
                required
              />
            </label>

            <label>
              Quantity
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                placeholder="Example: 5"
                min="0"
                required
              />
            </label>

            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Short item description"
                rows="3"
              />
            </label>

            <label>
              Supplier Name
              <input
                type="text"
                name="supplierName"
                value={form.supplierName}
                onChange={handleChange}
                placeholder="Example: ABC Supplies"
              />
            </label>

            <label className="checkbox-row">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
              />
              Available
            </label>

            <div className="button-row">
              <button type="submit">{editingId ? 'Update Item' : 'Add Item'}</button>
              {editingId && (
                <button type="button" className="secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              )}
            </div>
          </form>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
        </section>

        <section className="card table-card">
          <div className="table-header">
            <h2>Items List</h2>
            <button className="secondary" onClick={fetchItems}>Refresh</button>
          </div>

          {loading ? (
            <p>Loading items...</p>
          ) : items.length === 0 ? (
            <p>No items found. Add your first item.</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Supplier</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.quantity}</td>
                      <td>{item.isAvailable ? 'Available' : 'Not Available'}</td>
                      <td>{item.description || '-'}</td>
                      <td>{item.supplierName || '-'}</td>
                      <td>
                        <div className="action-row">
                          <button className="small" onClick={() => handleEdit(item)}>Edit</button>
                          <button className="small danger" onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
