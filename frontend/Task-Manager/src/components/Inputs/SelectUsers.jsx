import React, { useEffect, useMemo, useState } from 'react';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { LuUsers } from 'react-icons/lu';
import Modal from '../Modal';
import AvatarGroup from '../AvatarGroup';
import UserAvatar from '../UserAvatar';

const SelectUsers = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempSelectedUsers, setTempSelectedUsers] = useState([]);

  const normalizedSelectedUsers = useMemo(
    () => (Array.isArray(selectedUsers) ? selectedUsers : []),
    [selectedUsers]
  );

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      setAllUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectedUsers((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModalOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => normalizedSelectedUsers.includes(user._id))
    .map((user) => ({
      profileImageUrl: user.profileImageUrl,
      name: user.name,
      email: user.email,
    }));

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    setTempSelectedUsers(normalizedSelectedUsers);
  }, [normalizedSelectedUsers]);

  return (
    <div className="mt-2">
      {selectedUserAvatars.length === 0 ? (
        <button
          type="button"
          className="card-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <LuUsers className="text-sm" /> Add Members
        </button>
      ) : (
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm hover:border-blue-200 hover:bg-blue-50"
          onClick={() => setIsModalOpen(true)}
        >
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={4} />
          <span className="text-xs font-semibold text-slate-500">
            {selectedUserAvatars.length} selected
          </span>
        </button>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Select Users"
      >
        <div className="max-h-[60vh] space-y-2 overflow-y-auto pr-1">
          {allUsers.map((user) => (
            <label
              key={user._id}
              className="flex cursor-pointer items-center gap-4 rounded-xl border border-slate-200 p-3 transition hover:border-blue-200 hover:bg-blue-50"
            >
              <UserAvatar
                src={user.profileImageUrl}
                name={user.name}
                alt={user.name}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-slate-900">
                  {user.name}
                </p>
                <p className="truncate text-sm text-slate-500">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 outline-none"
              />
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-3 pt-5">
          <button
            type="button"
            className="card-btn"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button type="button" className="card-btn-fill" onClick={handleAssign}>
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SelectUsers;
