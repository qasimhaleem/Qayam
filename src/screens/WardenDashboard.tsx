import { Building2, TrendingUp, CloudUpload, Edit, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { cn } from '@/src/lib/utils';

export default function WardenDashboard() {
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
              <form className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Name</label>
                  <input className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:opacity-50" placeholder="e.g. Khyber Residency" type="text"/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Total Rooms</label>
                    <input className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="24" type="number"/>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Monthly Rent (PKR)</label>
                    <input className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="12,000" type="number"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Location Sector</label>
                  <select className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
                    <option>Hayatabad Phase 1</option>
                    <option>Hayatabad Phase 3</option>
                    <option>University Town</option>
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
                <button className="w-full bg-tertiary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all mt-4" type="button">
                  Submit Inquiry
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
                    {[
                      { name: "Khyber Executive", rooms: "12 Rooms Available", loc: "Phase 3, Hayatabad", status: "Active", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBkXLIZvDlsnZvWfusma2jIgGjixgleKmrafUZDvaYOcTJT0SrJI9KnvOl44gDIauAq8No3UkE2ACJT1pNOTvXr3r77UaSfqyRiN_Y7mSRuItXjUAVRQAWY-TWWVgW7xJ9dypU11h5jqqIUyCP3EQKfDMVaxwc5oDFx4n7hNLfAw13u5vmQZwG978XYV1-ASzi_0blLpZHdrQMJUjumiy7bmyZvN8v4yGRqjAWdXB3LImcpxt_NvoeS7rOtokqakxyjzBrU55PyyA" },
                      { name: "Townside Manor", rooms: "Fully Occupied", loc: "University Town", status: "Full", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHJII7Xo4uGXfSa5QrFG9-JqZFYJAC1mR1xNWwZibxwtCku3yaEtVwf4HreapUJGcjJ46XyDb3f_iLPILfDd68pq9v0THRBzBhPZSCweSwmS-VRCe6UPlaLwqY5YTYqhWZJKS16Qm8YRGUyNWdl31qJDHUPI2RdGTU4lDmSS1vsxjAJ7ebV95zCdovGJFDYa3yJrBUeqPrJifUTiK18z-_Cg6Hxw53wcgbX2uX-O9hE7cY8gK_TheZHONSOz8CDe_yH-LOci7Sews" },
                      { name: "The Bloom Suite", rooms: "2 Rooms Available", loc: "Gullberg Sector", status: "Active", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRo_1_rVYG9FdWvv8vNdG9MduM_I8vVXbqC6QNlpiL9xcPJpLWOKXB6K9sFzQOM8N7yf7Fx7BBhLYjimDnJQQv5yTG33kxj4Fn1V-vCG2NEjNBJgmpZqkIidOC1pB1txdITf0AkzymR6VvDqVOlWX2_kmYI55jGND-vnX0DE9Z_Vn1_OsYohjBmFDSGq-qDZNrplGJ1QHjbvt686jpVNbCebbXC_ik8v3755RawfvYTlT5hA_lVvL0EtLaZ0BvkHJkC52cVdMdDZQ" }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-surface-container-high/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-3">
                            <img src={row.img} className="w-12 h-12 rounded-lg object-cover" alt={row.name} referrerPolicy="no-referrer" />
                            <div>
                              <p className="text-sm font-bold text-on-surface">{row.name}</p>
                              <p className="text-[10px] text-on-surface-variant">{row.rooms}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-6 text-xs font-medium text-on-surface-variant">{row.loc}</td>
                        <td className="px-4 py-6">
                          <div className="flex items-center gap-2">
                            <div className={cn("w-10 h-5 rounded-full relative flex items-center px-1", row.status === 'Active' ? "bg-primary/20" : "bg-on-surface-variant/20")}>
                              <div className={cn("w-3 h-3 rounded-full absolute", row.status === 'Active' ? "bg-primary right-1" : "bg-on-surface-variant left-1")}></div>
                            </div>
                            <span className={cn("text-[10px] font-bold uppercase", row.status === 'Active' ? "text-primary" : "text-on-surface-variant")}>{row.status}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:bg-primary hover:text-white transition-all"><Edit className="w-4 h-4" /></button>
                            <button className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-error hover:bg-error hover:text-white transition-all"><Trash2 className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
