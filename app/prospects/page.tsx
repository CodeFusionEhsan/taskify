'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Jost } from 'next/font/google';

const jost = Jost({ subsets: ['latin'], weight: ['400', '600'] });

export default function ProspectPage() {
  const { user } = useUser();
  const [form, setForm] = useState({
    name: '',
    email: '',
    industry: '',
    website: '',
    phone: '',
  });
  const [prospects, setProspects] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (user) fetchProspects();
  }, [user]);

  async function fetchProspects() {
    const res = await axios.get('/api/get/prospect');
    setProspects(res.data);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!user) return;

    const payload = {
      ...form,
    };

    if (editingId !== null) {
      await axios.put(`/api/update/prospects/${editingId}`, payload);
    } else {
      await axios.post('/api/new/prospect', payload);
    }
    setForm({ name: '', email: '', industry: '', website: '', phone: '' });
    setEditingId(null);
    fetchProspects();
  }

  function startEdit(prospect: any) {
    setForm(prospect);
    setEditingId(prospect.id);
  }

  async function handleDelete(id: number) {
    await axios.delete(`/api/update/prospects/${id}`);
    fetchProspects();
  }

  return (
    <div className={`${jost.className} min-h-screen bg-gray-100 text-gray-900 p-6 w-full`}>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Add Prospect</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'email', 'industry', 'website', 'phone'].map((field) => (
            <input
              key={field}
              type="text"
              required={['name', 'email', 'industry'].includes(field)}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          ))}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            {editingId ? 'Update' : 'Add'} Prospect
          </button>
        </form>
      </div>

      <div className="max-w-4xl mx-auto mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Prospect List</h2>
        <ul className="space-y-4">
          {prospects.map((p) => (
            <li key={p.id} className="border-b pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p><strong>Name:</strong> {p.name}</p>
                  <p><strong>Email:</strong> {p.email}</p>
                  <p><strong>Industry:</strong> {p.industry}</p>
                  {p.website && <p><strong>Website:</strong> {p.website}</p>}
                  {p.phone && <p><strong>Phone:</strong> {p.phone}</p>}
                </div>
                <div className="space-x-2">
                  <button onClick={() => startEdit(p)} className="text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}