import React from 'react';
import { Building2, TrendingUp, CloudUpload, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { cn } from '@/src/lib/utils';

export default function WardenDashboard() {
  const [name, setName] = useState('');
  const [rooms, setRooms] = useState('');
  const [rent, setRent] = useState('');
  const [location, setLocation] = useState('Hayatabad Phase 3');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [hostels, setHostels] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      const hasVisited = localStorage.getItem('hasVisited');
      if (!hasVisited) {
        localStorage.setItem('hasVisited', 'true');
        navigate('/signup');
      } else {
        navigate('/login');
      }
    }
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const meData = await res.json();
      if (!meData.success) return;

      const wardenId = meData.data._id;
      const hostelRes = await fetch(`http://localhost:5000/api/hostels?warden=${wardenId}`);
      const hostelData = await hostelRes.json();

      if (hostelData.success) {
        setHostels(hostelData.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const meData = await res.json();
      if (!meData.success) throw new Error('Not authorized');

      const wardenName = meData.data.name;

      // Note: Image upload can be handled separately. Sending placeholder here.
      const addRes = await fetch('http://localhost:5000/api/hostels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          location,
          capacity: parseInt(rooms) || 0,
          price: rent,
          wardenName,
          contactNumber: 'Update Contact Later',
          image: 'https://via.placeholder.com/400x300'
        })
      });

      const addData = await addRes.json();
      if (addData.success) {
        setMessage('Hostel Successfully Added!');
        setName('');
        setRooms('');
        setRent('');
        fetchDashboardData();
      } else {
        setMessage(addData.error || 'Failed to add hostel');
      }
    } catch (err: any) {
      setMessage(err.message || 'Error executing request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:ml-72 min-h-screen p-8 lg:p-12">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
          <div>
            <h2 className="text-4xl font-black text-primary tracking-tighter mb-2">Warden Dashboard</h2>
            <p className="text-on-surface-variant font-medium">Manage your properties and inquiries with editorial precision.</p>
          </div>
          <button className="bg-primary text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest active:scale-95 transition-transform shadow-xl">
            Add New Hostel
          </button>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Add Hostel Form */}
          <section className="xl:col-span-5 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold tracking-tight text-on-surface">Add New Hostel</h3>
                <Building2 className="text-primary w-6 h-6" />
              </div>
              {message && <div className="mb-4 p-3 bg-secondary text-white text-xs font-bold rounded-lg">{message}</div>}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Name</label>
                  <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:opacity-50" placeholder="e.g. Khyber Residency" type="text" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Total Rooms</label>
                    <input value={rooms} onChange={e => setRooms(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="24" type="number" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Monthly Rent (PKR)</label>
                    <input value={rent} onChange={e => setRent(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="12,000" type="number" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Location Sector</label>
                  <select value={location} onChange={e => setLocation(e.target.value)} className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                    <option>Hayatabad Phase 1</option>
                    <option>Hayatabad Phase 3</option>
                    <option>University Town</option>
                    <option>Board Bazaar</option>
                    <option>Gullberg</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Image</label>
                  <div className="relative w-full aspect-video bg-surface-container rounded-xl border-2 border-dashed border-on-surface-variant/20 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface-container-high transition-colors group">
                    <CloudUpload className="w-10 h-10 text-primary/40 group-hover:text-primary transition-colors" />
                    <p className="text-xs font-medium text-on-surface-variant">Drop image here or click to upload</p>
                    <p className="text-[10px] text-on-surface-variant/50">JPG, PNG up to 5MB</p>
                  </div>
                </div>
                <button disabled={loading} className="w-full bg-tertiary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all mt-4" type="submit">
                  {loading ? 'Submitting...' : 'Upload Hostel Listing'}
                </button>
              </form>
            </div>

            <div className="bg-primary-container text-white p-6 rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Total Revenue</p>
                <p className="text-2xl font-black">₨ 842,500</p>
              </div>
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
          </section>

          {/* Right Column: Management Table */}
          <section className="xl:col-span-7">
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden editorial-shadow">
              <div className="p-8 pb-4">
                <h3 className="text-xl font-bold tracking-tight text-on-surface">Active Management</h3>
                <p className="text-xs text-on-surface-variant mt-1">Real-time status of your listed properties in Peshawar.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low">
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Name</th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-secondary">Location</th>
                      <th className="px-4 py-4 text-[10px] font-bold uppercase tracking-wider text-secondary">Status</th>
                      <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-wider text-secondary text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-container">
                    {hostels.length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-8 py-6 text-center text-on-surface-variant text-sm">No hostels found. Add one above!</td>
                      </tr>
                    )}
                    {hostels.map((hostel, i) => {
                      const status = "Active";
                      return (
                        <tr key={i} className="hover:bg-surface-container-high/30 transition-colors group">
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-3">
                              <img src={hostel.image} className="w-12 h-12 rounded-lg object-cover" alt={hostel.name} referrerPolicy="no-referrer" />
                              <div>
                                <p className="text-sm font-bold text-on-surface">{hostel.name}</p>
                                <p className="text-[10px] text-on-surface-variant">{hostel.capacity} Rooms Available</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-6 text-xs font-medium text-on-surface-variant">{hostel.location}</td>
                          <td className="px-4 py-6">
                            <div className="flex items-center gap-2">
                              <div className={cn("w-10 h-5 rounded-full relative flex items-center px-1", status === 'Active' ? "bg-primary/20" : "bg-on-surface-variant/20")}>
                                <div className={cn("w-3 h-3 rounded-full absolute", status === 'Active' ? "bg-primary right-1" : "bg-on-surface-variant left-1")}></div>
                              </div>
                              <span className={cn("text-[10px] font-bold uppercase", status === 'Active' ? "text-primary" : "text-on-surface-variant")}>{status}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Edit className="w-4 h-4" /></button>
                              <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-error hover:bg-error hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-8 relative overflow-hidden rounded-xl h-64 group cursor-pointer">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6B-6mqIIoOcYdn7TgvLpvqUDyTLqlMb1w_dQo68Cwp7NpHYII6UzrMl1T50YJ_pCVviUwrCXvFlWNndLZ4NJYa8uO7J4oep9l_ZNPMgqT53Hzf0F1Lz21HbJM_ugGWjigtCtxMktfriz9d16u_UIGR9Y9AcRii-N4qa0r4XLNCmXbRJL8JRfgL4Yux2ugtAKOEkrj6GtxF65TnOJQWlhaYgrFUhkoMiDbASf-FkOpi-K7sLU4DPsM4D5tm1lMGpL-4nssflTQYIQ" alt="Landscape" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-fixed mb-2">Expansion Insight</span>
                <h4 className="text-2xl font-bold text-white mb-1">Explore High-Demand Areas</h4>
                <p className="text-white/70 text-sm max-w-md">Data shows a 40% increase in student inquiries in the Hayatabad Phase 1 region. Consider expanding listings there.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
