'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useUser } from '@clerk/nextjs';

const categories = [
  'Web Development',
  'Mobile App',
  'Design',
  'Marketing',
  'Consulting',
  'Other',
];

const Modal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;

  const[title, setTitle] = useState("")
  const[client, setClient] = useState("")
  const[category, setCategory] = useState("")
  const[revenue, setRevenue] = useState("")
  const[description, setDescription] = useState("")
  const[deadline, setDeadline] = useState("")

  const { user, isSignedIn, isLoaded} = useUser()

  const handleSubmit = async (e:any) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("title", title)
    formData.append("deadline", deadline)
    formData.append("category", category)
    formData.append("client", client)
    formData.append("revenue", revenue)
    formData.append("description", description)
    formData.append("user", user ? user.id : "")
    formData.append("user_email", user ? user.emailAddresses[0].emailAddress : "")

    try { 
      const res = await fetch('/api/new', {
        method: "POST",
        body: formData
      })

      const jsres = await res.json()

      console.log(jsres)

      if (jsres.success == true) {  
        window.location.href = "/"
      } else {
        console.log(jsres.message)
      }

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-300 bg-opacity-40" style={{ fontFamily: "'Jost', sans-serif" }}>
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-blue-600 transition-colors text-2xl"
          aria-label="Close"
        >
          &times;
        </button>
        {/* Modal Heading */}
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center font-jost">
          Create A New Project
        </h2>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-jost">
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Title</label>
            <input
              type="text"
              className="w-full border text-black border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter project title"
              required
              value={title}
              onChange={(e) => { setTitle(e.target.value) }}
            />
          </div>
          <div>
            <label className="block text-blue-800 font-semibold mb-1">Description</label>
            <textarea
              className="w-full text-black border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
              placeholder="Describe your project"
              rows={3}
              maxLength={250}
              required
              value={description}
              onChange={(e) => { setDescription(e.target.value) }}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-blue-800 font-semibold mb-1">Deadline</label>
              <input
                type="date"
                className="w-full text-black border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
                value={deadline}
                onChange={(e) => { setDeadline(e.target.value) }}
              />
            </div>
            <div className="flex-1">
              <label className="block text-blue-800 font-semibold mb-1">For</label>
              <input
                type="text"
                className="w-full text-black border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="Who is this project for?"
                required
                value={client}
                onChange={(e) => { setClient(e.target.value) }}
              />
            </div>
          </div>
          <div className="flex text flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-blue-800 font-semibold mb-1">Category</label>
              <select
                className="w-full text-black border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-blue-800 font-semibold mb-1">Revenue</label>
              <input
                type="text"
                className="w-full text-black border border-blue-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="₹"
                required
                value={revenue}
                onChange={(e) => { setRevenue(e.target.value)}}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold shadow hover:bg-blue-700 transition-colors text-lg"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
};


const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'AI Assistant', href: '/ai-assistant' },
  { name: 'Invitations', href: '/invitations' },
  { name: 'Invoices', href: '/invoices' },
  { name: 'Prospect List', href: '/prospects' },
  { name: 'News', href: '/news' },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      <button
        className="fixed absolute top-24 left-4 z-40 bg-white border border-gray-400 rounded-full p-2 shadow-md sm:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-blue-600" />
      </button>

      {/* Overlay - Mobile Only */}
      <div
        className={`fixed inset-0 bg-white bg-opacity-20 z-30 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } sm:hidden`}
        onClick={() => setOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-[92vh] w-72 bg-gradient-to-b from-white via-blue-50 to-blue-100 border-r border-blue-100 z-50 transform transition-transform duration-300 flex flex-col
        ${open ? 'translate-x-0' : '-translate-x-full'} 
        sm:translate-x-0 sm:static sm:shadow-none sm:w-64 sm:flex
        `}
        style={{ fontFamily: "'Jost', sans-serif" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-blue-100">
          <span className="text-2xl font-bold text-blue-700 tracking-tight">Welcome User</span>
          {/* Close Button - Mobile Only */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close sidebar"
            className="p-2 rounded-full hover:bg-blue-100 transition-colors sm:hidden"
          >
            <X className="w-6 h-6 text-blue-600" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-6 py-4 space-y-2">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href}>
              <span
                className="block px-4 py-2 rounded-md text-blue-800 hover:bg-blue-200 hover:text-blue-700 font-medium transition-colors duration-200 cursor-pointer"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </span>
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="px-6 pb-6 space-y-2">
          <button onClick={() => setOpenModal(true)} className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold shadow hover:bg-blue-700 transition-colors duration-200">
            Create Project
          </button>
          <a
            href="https://linkedin.com/in/ehsan-saleem-web3"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-block text-center bg-blue-100 text-blue-700 py-2 rounded-md font-semibold shadow hover:bg-blue-200 transition-colors duration-200 mt-6"
          >
            Connect with Developer
          </a>
        </div>
      </aside>
      <Modal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Sidebar;
