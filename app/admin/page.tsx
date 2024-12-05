'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import EditUserModal from '../components/EditUserModal';
import Modal from '../components/DeleteModal'; // Import the modal component
import Toast from '../components/Toast';
import Image from 'next/image';

interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

export default function Admin() {
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState<User[] | null>(null);
    const { user, loading, isAuthenticated, isAdmin } : any = useAuth();
    const [filter, setFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState(''); 

    // Modal states
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [editUserData, setEditUserData] = useState<User | null>(null);
  
    useEffect(() => {

      if (!loading && !isAuthenticated) {
        router.push('/login');
      }
      if (!loading && isAuthenticated && !isAdmin) {
        router.push('/notfound');
      }
      if (!loading && user) {

          getAllUsers();
      }
    }, [isAuthenticated, loading, router, user, isAdmin]);
    
    const filteredUsers = users
        ?.filter((user) => {
        if (filter === 'all') return true;
        if (filter === 'admin') return user.isAdmin;
        if (filter === 'user') return !user.isAdmin;
        return true;
        })
        .filter((user) =>
        searchQuery === '' || user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const getAllUsers = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/users`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const data = await res.json();
            setUsers(data);
          } else {
            setMessage('No users found!');
          }
        } catch (err) {
          console.log(err);
          setMessage('Error fetching users');
        }
      }
    };
  
    const handleDeleteClick = (userId: number) => {
      setSelectedUserId(userId);
      setIsDeleteModalOpen(true);
    };
  
    const handleEditClick = (user: User) => {
      setEditUserData(user);
      setIsEditModalOpen(true);
    };
  
    const handleConfirmDelete = async () => {
      if (!selectedUserId) return;
  
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/users/${selectedUserId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (res.ok) {
          setUsers((prev) => prev?.filter((user) => user.id !== selectedUserId) || null);
          setIsError(false);
          setMessage('User was deleted successfully!');
          setShowToast(true);
          setTimeout(() => setShowToast(false), 4000);
        } else {
            setIsError(true)
            setMessage('Failed to delete user');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          console.error('Failed to delete user');
        }
      } catch (err) {
        setIsError(true)
        setMessage('Error deleting user');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000);
        console.error('Error deleting user:', err);
      } finally {
        setIsDeleteModalOpen(false);
        setSelectedUserId(null);
      }
    };
  
    const handleConfirmEdit = async (updatedUser: { id: number; name: string; isAdmin: boolean }) => {
        const token = localStorage.getItem('token');
        
        if (editUserData) {
          const userToUpdate = { ...editUserData, ...updatedUser }; // Merge the updated user data, leaving email unchanged
          
          try {
            const res = await fetch(`https://movie-project-bk-630243095989.us-central1.run.app/api/users/${userToUpdate.id}`, {
              method: 'PUT',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(userToUpdate),
            });
      
            if (res.ok) {
              setUsers((prev) =>
                prev?.map((user) => (user.id === userToUpdate.id ? userToUpdate : user)) || null
              );
              setIsError(false);
              setMessage('User was edited successfully!');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 4000);
            } else {
              setIsError(true);
              setMessage('Failed to update user');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 4000);
              console.error('Failed to update user');
            }
          } catch (err) {
            console.error('Error updating user:', err);
            setIsError(true);
            setMessage('Error updating user:');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 4000);
          } finally {
            setIsEditModalOpen(false);
            setEditUserData(null);
          }
        }
      };
    const myLoader = ({ src } : any) => {
      return `https://ui-avatars.com/api/?name=${src}&background=random`;
    };
    
    const handleFilterClick = (filterType: string) => {
        setFilter(filterType);
      };
    
  return (
      <>   
        <div className="my-3 mx-12 relative flex flex-col h-full text-gray-700 bg-black-100 shadow-md rounded-xl bg-clip-border">
            <div className="relative mx-4 mt-4 overflow-hidden text-white bg-black-100 rounded-none bg-clip-border">
                <div className="flex items-center justify-between gap-8 mb-8">
                <div>
                    <h5
                    className="block font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">
                    Manager Users
                    </h5>
                    <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-white">
                    See and edit information about all users.
                    </p>
                </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <div className="block w-full overflow-hidden md:w-max">
                    <nav>
                    <ul role="tablist" className="relative flex flex-row p-1 rounded-lg bg-white">
                        <li 
                            role="tab"
                            className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-transparent cursor-pointer select-none text-black ${filter === 'all' ? 'active-class' : ''}`} 
                            data-value="all"
                            onClick={() => handleFilterClick('all')}
                            >
                            <div className="z-20 text-inherit">
                                &nbsp;&nbsp;All&nbsp;&nbsp;
                            </div>
                            <div className={`absolute inset-0 z-10 h-full bg-white rounded-md shadow  ${filter === 'all' ? 'active-class-button' : ''}`}></div>
                        </li>
                        <li 
                            role="tab"
                            className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-white cursor-pointer select-none text-black ${filter === 'admin' ? 'active-class' : ''}`} 
                            data-value="admin"
                            onClick={() => handleFilterClick('admin')}
                            >
                            <div className="z-20 text-inherit">
                                &nbsp;&nbsp;Admin&nbsp;&nbsp;
                            </div>
                            <div className={`absolute inset-0 z-10 h-full bg-white rounded-md shadow  ${filter === 'admin' ? 'active-class-button' : ''}`}></div>
                        </li>
                        <li 
                            role="tab"
                            className={`relative flex items-center justify-center w-full h-full px-2 py-1 font-sans text-base antialiased font-normal leading-relaxed text-center bg-white cursor-pointer select-none text-black ${filter === 'user' ? 'active-class' : ''}`} 
                            data-value="user"
                            onClick={() => handleFilterClick('user')}
                            >
                            <div className="z-20 text-inherit">
                                &nbsp;&nbsp;User&nbsp;&nbsp;
                            </div>
                            <div className={`absolute inset-0 z-10 h-full bg-white rounded-md shadow  ${filter === 'user' ? 'active-class-button' : ''}`}></div>
                        </li>
                    </ul>
                    </nav>
                </div>
                <div className="w-full md:w-72">
                    <div className="relative h-10 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                        stroke="currentColor" aria-hidden="true" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round"
                            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                        </svg>
                    </div>
                    <input
                        className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 !pr-9 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                        placeholder=" " 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    <label
                        className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                        Search
                    </label>
                    </div>
                </div>
                </div>
            </div>
            <div className="p-6 px-0">
                <table className="w-full mt-4 text-left table-auto min-w-max">
                <thead>
                    <tr>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
                        User
                        </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
                        Role
                        </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
                        Delete User
                        </p>
                    </th>
                    <th className="p-4 border-y border-blue-gray-100 bg-blue-gray-50/50">
                        <p className="block font-sans text-sm antialiased font-normal leading-none text-white opacity-70">
                        Edit User
                        </p>
                    </th>
                    </tr>
                </thead>
                <tbody>

                {filteredUsers?.map((data) => (
                    <tr key={data.id}>
                    <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex items-center gap-3">
                        <Image
                            loader={myLoader}
                            src={data.name.toUpperCase()}
                            alt="John Michael" className="relative inline-block h-9 w-9 !rounded-full object-cover object-center"
                            width={500} 
                            height={300}
                        />
                        <div className="flex flex-col">
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-white">
                            {data.name}
                            </p>
                            <p
                            className="block font-sans text-sm antialiased font-normal leading-normal text-white opacity-70">
                            {data.email}
                            </p>
                        </div>
                        </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <div className="flex flex-col">
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-white">
                            {(data.isAdmin) ? "Admin" : "User"}
                        </p>
                        </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <div className="w-max">
                            <button
                                onClick={() => handleDeleteClick(data.id)}
                                type="button"
                                disabled={loading || user.id === data.id}
                                // style={{ backgroundColor: '#e50914' }}
                                className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-1 text-center ${
                                    loading || user.id === data.id
                                      ? 'bg-gray-400 cursor-not-allowed'
                                      : 'hover:bg-red-700 focus:ring-blue-300 dark:bg-netflixRed dark:hover:bg-red dark:focus:ring-blue-800'
                                  }`}
                                >
                                Delete User
                            </button>
                        </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                        <button
                        onClick={() => handleEditClick(data)}
                        className="px-4 py-1 text-white outline rounded-md hover:bg-blue-700"
                        >
                        Edit
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
            {isDeleteModalOpen && (
                <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                />
            )}
            {isEditModalOpen && editUserData && (
                <EditUserModal
                    isOpen={isEditModalOpen}
                    user={editUserData}
                    onClose={() => setIsEditModalOpen(false)}
                    onConfirm={handleConfirmEdit}
                />
            )}
            {showToast && (
                <Toast 
                    message={message} 
                    onClose={() => setShowToast(false)} 
                    type={isError ? 'error' : 'success'} // Pass 'error' or 'success' based on your condition
                />
            )}
            </div>
      </>
    )
  }