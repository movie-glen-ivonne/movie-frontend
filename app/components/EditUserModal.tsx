import React, { useState } from 'react';

interface EditUserModalProps {
  isOpen: boolean;
  user: {
    id: number;
    name: string;
    email: string;
    isAdmin: boolean;
  };
  onClose: () => void;
  onConfirm: (updatedUser: { id: number; name: string; isAdmin: boolean }) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ isOpen, user, onClose, onConfirm }) => {
  const [name, setName] = useState(user.name); // Controlled input for the user's name
  const [isAdmin, setIsAdmin] = useState(user.isAdmin); // Controlled input for isAdmin

  const handleConfirm = () => {
    onConfirm({ id: user.id, name, isAdmin });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
      aria-labelledby="edit-user-modal"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4" id="edit-user-modal">
          Edit User
        </h2>

        {/* Input for Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter user name"
          />
        </div>

        {/* Select for Role */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Role
          </label>
          <select
            id="role"
            value={isAdmin ? 'Admin' : 'User'}
            onChange={(e) => setIsAdmin(e.target.value === 'Admin')}
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;