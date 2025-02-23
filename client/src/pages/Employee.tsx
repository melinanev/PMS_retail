import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser, updateUser, createUser } from "../api/userAPI";
import "../styles/Employees.css";

type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
};

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [alertMessage, setAlertMessage] = useState<string | null>(null);
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [viewMode, setViewMode] = useState<"table" | "grid">("table"); // Default to "table"
    const [addingUser, setAddingUser] = useState<boolean>(false);
    const [newUser, setNewUser] = useState<Partial<User>>({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users", error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => setAlertMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [alertMessage]);

    const handleDelete = async (id: number) => {
        try {
            await deleteUser(id);
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
            setAlertMessage("User deleted!");
        } catch (error) {
            console.error("Error deleting user:", error);
            setAlertMessage('Error deleting user');
        }
    };

    const handleEdit = (user: User) => {
        setEditingUser({ ...user });
    };

    const handleSaveEdit = async () => {
        if (!editingUser) return;

        if (!editingUser.firstName || !editingUser.lastName || !editingUser.email || !editingUser.role) {
            setAlertMessage("Please fill out all fields.");
            return;
        }

        try {
            const updatedUser = await updateUser(editingUser.id, editingUser);
            if (updatedUser) {
                setUsers((prevUsers) => prevUsers.map((user) => (user.id === editingUser.id ? editingUser : user)));
                setEditingUser(null);
                setAlertMessage("User updated successfully");
            }
        } catch (error) {
            console.error("Error updating user:", error);
            setAlertMessage("Error updating user");
        }
    };

    const handleAddUser = async () => {
        if (!newUser.username || !newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password || !newUser.role) {
            setAlertMessage("Please fill out all required fields.");
            return;
        }

        try {
            await createUser({
                id: 0,
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                password: newUser.password,
                role: newUser.role
            });

            setNewUser({ username: '', firstName: '', lastName: '', email: '', password: '', role: '' });
            setAddingUser(false);
            setAlertMessage("User added!");

            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error("Error adding user:", error);
            setAlertMessage("Error adding user");
        }
    };

    const filteredUsers = users.filter((user) =>
        (user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (user.username?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (user.email?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (user.password?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
        (user.role?.toLowerCase().includes(searchTerm.toLowerCase()) || '')
    );

    return (
        <div className="layout-container">
            <main className="main-content">
                <div className="users">
                    <h1>Employee Management</h1>
                    <div className="user-controls">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search users"
                        />

                        <button onClick={() => setViewMode(viewMode === "table" ? "grid" : "table")}
                            style={{
                                backgroundColor: "#3498db",
                                color: "white",
                                padding: "8px",
                                borderRadius: "8px",
                                border: "none",
                                cursor: "pointer",
                            }}
                        >
                            Toggle View
                        </button>
                    </div>

                    {alertMessage && <div className="alert">{alertMessage}</div>}

                    {viewMode === "table" && (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6}>No users found</td>
                                    </tr>
                                ) : (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{user.id}</td>
                                            <td>{user.username}</td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.role}</td>
                                            <td>
                                               
                                                <button onClick={() => handleEdit(user)} aria-label={`Edit ${user.username}`}>Edit</button>
                                                <button onClick={() => handleDelete(user.id)} aria-label={`Delete ${user.username}`}>Delete</button>
                                                
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}

                    {viewMode === "grid" && (
                        <div className="grid-container">
                            {filteredUsers.length === 0 ? (
                                <p>No users found</p>
                            ) : (
                                filteredUsers.map((user) => (
                                    <div className="user-card" key={user.id}>
                                        <p><strong>{user.firstName} {user.lastName}</strong></p>
                                        <p>Username: {user.username}</p>
                                        <p>Email: {user.email}</p>
                                        <p>Role: {user.role}</p>

                                        <button onClick={() => handleEdit(user)} aria-label={`Edit ${user.username}`} className='userOpButton'>Edit</button>
                                        <button onClick={() => handleDelete(user.id)} aria-label={`Delete ${user.username}`}className='userOpButton'>Delete</button>
                                        
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* Add User Modal */}
                    {addingUser && (
                        <div className="edit-form">
                            <h3>Add User</h3>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={newUser.username}
                                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                                    placeholder="Username"
                                    aria-label="Username"
                                />
                            </div>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={newUser.firstName}
                                    onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
                                    placeholder="First Name"
                                    aria-label="First Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={newUser.lastName}
                                    onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
                                    placeholder="Last Name"
                                    aria-label="Last Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="Email"
                                    aria-label="Email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={newUser.password}
                                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                    placeholder="Password"
                                    aria-label="Password"
                                />
                            </div>
                            <div>
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    placeholder="Role"
                                    aria-label="Role"
                                />
                            </div>
                            <button onClick={handleAddUser} aria-label="Add user">Add</button>
                            <button onClick={() => setAddingUser(false)} aria-label="Cancel adding user">Cancel</button>
                        </div>
                    )}

                    {/* Edit User Modal */}
                    {editingUser && (
                        <div className="edit-form">
                            <h3>Edit User</h3>
                            <div>
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={editingUser.firstName}
                                    onChange={(e) => setEditingUser({ ...editingUser, firstName: e.target.value })}
                                    placeholder="First Name"
                                    aria-label="First Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={editingUser.lastName}
                                    onChange={(e) => setEditingUser({ ...editingUser, lastName: e.target.value })}
                                    placeholder="Last Name"
                                    aria-label="Last Name"
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                    placeholder="Email"
                                    aria-label="Email"
                                />
                            </div>
                            <div>
                                <label htmlFor="role">Role</label>
                                <input
                                    type="text"
                                    id="role"
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                                    placeholder="Role"
                                    aria-label="Role"
                                />
                            </div>
                            <div className="form-actions">
                                <button onClick={handleSaveEdit} aria-label="Save changes">Save</button>
                                <button onClick={() => setEditingUser(null)} aria-label="Cancel editing">Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Users;
