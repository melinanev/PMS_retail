import { useState } from 'react';
import axios from 'axios';

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose}) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password:'',
        role: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('/auth/register', formData);
            alert("Congrats you did it!");
            onClose();
        } catch (error) {
            console.error("You failed to register")
        } finally {
            setLoading(false)
        }
    };
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Register</h2>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              required
            />
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="employee">Employee</option>
              <option value="manager">Manager</option>
            </select>
  
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-gray-500 text-white rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
};

export default RegisterModal;