import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet, LuUserPlus } from 'react-icons/lu';
import UserCard from '../../components/Cards/UserCard';
import { toast } from 'react-hot-toast';
import Modal from '../../components/Modal';
import DeleteAlert from '../../components/DeleteAlert';
import { validateEmail } from '../../utils/helper';

const emptyForm = {
  name: '',
  email: '',
  password: '',
  profileImageUrl: '',
};

const ManageUsers =() => {
  const [allUsers, setAllUsers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [memberForm, setMemberForm] = useState(emptyForm);
  const [editingUser, setEditingUser] = useState(null);
  const [memberToDelete, setMemberToDelete] = useState(null);
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const getAllUsers = async() => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      setAllUsers(response.data || []);
    } catch (error){
      console.error("Error fetching users:", error);
      toast.error("Failed to load team members.");
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORTS.EXPORT_USERS_REPORT, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "users_report.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      toast.error("Failed to download report. Please try again.");
    }
  };

  const openAddMember = () => {
    setEditingUser(null);
    setMemberForm(emptyForm);
    setFormError('');
    setIsFormOpen(true);
  };

  const openEditMember = (user) => {
    setEditingUser(user);
    setMemberForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      profileImageUrl: user.profileImageUrl || '',
    });
    setFormError('');
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingUser(null);
    setMemberForm(emptyForm);
    setFormError('');
  };

  const handleFormChange = (key, value) => {
    setMemberForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateMemberForm = () => {
    if (!memberForm.name.trim()) return "Name is required.";
    if (!validateEmail(memberForm.email)) return "Enter a valid email address.";
    if (!editingUser && memberForm.password.length < 8) return "Password must be at least 8 characters.";
    if (editingUser && memberForm.password && memberForm.password.length < 8) return "Password must be at least 8 characters.";
    return "";
  };

  const handleSaveMember = async (event) => {
    event.preventDefault();

    const validationMessage = validateMemberForm();
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    setLoading(true);
    setFormError('');

    const payload = {
      name: memberForm.name.trim(),
      email: memberForm.email.trim(),
      profileImageUrl: memberForm.profileImageUrl.trim(),
      ...(memberForm.password ? { password: memberForm.password } : {}),
    };

    try {
      if (editingUser) {
        await axiosInstance.put(API_PATHS.USERS.UPDATE_USER(editingUser._id), payload);
        toast.success("Team member updated.");
      } else {
        await axiosInstance.post(API_PATHS.USERS.CREATE_USER, payload);
        toast.success("Team member added.");
      }
      closeForm();
      getAllUsers();
    } catch (error) {
      const message = error.response?.data?.message || "Unable to save team member.";
      setFormError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async () => {
    if (!memberToDelete) return;

    setLoading(true);
    try {
      await axiosInstance.delete(API_PATHS.USERS.DELETE_USER(memberToDelete._id));
      toast.success("Team member removed.");
      setMemberToDelete(null);
      getAllUsers();
    } catch (error) {
      const message = error.response?.data?.message || "Unable to remove team member.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [])

  return (
    <DashboardLayout activeMenu="Team Members">
      <div className="mb-10 mt-5">
        <div className="page-header">
          <div>
            <h2 className="page-title">Team Members</h2>
            <p className="page-subtitle">Add, edit, or remove members from your task team.</p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button className="card-btn-fill" type="button" onClick={openAddMember}>
              <LuUserPlus className="text-lg"/>
              Add Member
            </button>

            <button className="download-btn" type="button" onClick={handleDownloadReport}>
              <LuFileSpreadsheet className="text-lg"/>
              Download Report
            </button>
          </div>
        </div>

        {allUsers.length === 0 ? (
          <div className="card mt-5 text-center">
            <p className="text-sm font-semibold text-slate-700">No team members yet.</p>
            <p className="mt-1 text-sm text-slate-500">Add a member to start assigning tasks.</p>
          </div>
        ) : (
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {allUsers.map((user) => (
              <UserCard
                key={user._id}
                userInfo={user}
                onEdit={() => openEditMember(user)}
                onDelete={() => setMemberToDelete(user)}
              />
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isFormOpen}
        onClose={closeForm}
        title={editingUser ? "Edit Team Member" : "Add Team Member"}
      >
        <form onSubmit={handleSaveMember} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">Full Name</label>
            <input
              className="form-input"
              value={memberForm.name}
              onChange={({ target }) => handleFormChange('name', target.value)}
              placeholder="Member name"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input
              className="form-input"
              value={memberForm.email}
              onChange={({ target }) => handleFormChange('email', target.value)}
              placeholder="member@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Password {editingUser && <span className="font-normal text-slate-400">(leave blank to keep current)</span>}
            </label>
            <input
              className="form-input"
              value={memberForm.password}
              onChange={({ target }) => handleFormChange('password', target.value)}
              placeholder="Min 8 characters"
              type="password"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">Profile Image URL</label>
            <input
              className="form-input"
              value={memberForm.profileImageUrl}
              onChange={({ target }) => handleFormChange('profileImageUrl', target.value)}
              placeholder="https://example.com/avatar.png"
            />
          </div>

          {formError && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-600">
              {formError}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="card-btn" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="card-btn-fill" disabled={loading}>
              {loading ? "Saving..." : editingUser ? "Update Member" : "Add Member"}
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={Boolean(memberToDelete)}
        onClose={() => setMemberToDelete(null)}
        title="Remove Team Member"
      >
        <DeleteAlert
          content={`Remove ${memberToDelete?.name || "this member"} from your team? They will also be removed from assigned task lists.`}
          onDelete={handleDeleteMember}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default ManageUsers
