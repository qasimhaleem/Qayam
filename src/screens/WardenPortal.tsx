import { Search, Filter, Download, Home, Edit, Trash2, ChevronLeft, ChevronRight, Ban, CheckCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { cn } from '@/src/lib/utils';

const listings = [
  { name: "Khyber Heights Male Hostel", loc: "Hayatabad Phase 6, Peshawar", status: "Active", rev: "420,000", occ: 85, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQXpuk730QfWwqK-DJFMMBVD2hTsVor0k1Q6X1e3U7HWI97XJib1fnz_0QgqBtQdPyvH-N7Iyg4YNF3Pl-lxr2XCPvdVJZVuYOWsZAuk2qjhvNPpOHeKRxTX42BzJk_78SzzarY-SQyQpgGng5TSaxWpScxgo6Y-FTgFJsv3nzBKZwJftTcnvHVpB9o3JMLLqFBi0T6fGKp7RD0Sezewg9J5zouy9f6mEvP7nKxetaqQyib4KGNn9Q3pVm3ajt36OJh6uwwLMAQVY" },
  { name: "Emerald Girls Residence", loc: "Town Abadi, Peshawar", status: "Full", rev: "285,000", occ: 100, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvSQAs0DzTf6Ihs3_I86l3R5oX2kcu0qvYdDBb557HCJMpH6ISHxUQYAwVMnTM1IQGf7lwhlZbjSYzHFPI1RWOL3rmm5Xsaf0l6bpRm6yAF-4QDzfwG4AETGG9JR3HDDDsaRHCOiq3IKcZxqhudLIWIfLvOJXrldeFnHS23Zhy7WQsb-X8e-Qj_1HyfvHH0LkO7NRGJek9m0c1lq-UiislRHyNTdnoyDTtIRX8rruSCAxHj3c37kBSdFzP1-3niSMa5lvqqt8Mczg" },
  { name: "Gulberg Executive Suites", loc: "Gulberg Colony, Peshawar", status: "Active", rev: "512,000", occ: 72, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1z5Q6Rej2AMjmm1KIsinJ1nUBW0OamquIFXTvPc-VghoxXofXym1RvY8lckxBntNNueybDL4BPv8zFEYCzjZgAjm4ujsk5tB8TEPIaawEJgjaGu5Yg6XkVlDJzBWSB1gvLkq9s08cGR2viFt8xJObOHuFuJoi37MZSN57X3he1UdXKUjSQZfp2nJcu8H2or4MrNUpIBrTt1Q_B9Gg07Z8BJLulwIytRNh2L1CBQlbIQJPh7t_uVNDS9d8CwTajBFQ-hBacKXU_1I" },
  { name: "Cantt View Premium", loc: "Saddar Road, Peshawar Cantt", status: "Active", rev: "680,000", occ: 92, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZagftFn9kGz1OzgJDnjF-DS9cuaBuAu2fq6Fc3agkM3nL5va5uuHce8ce6ydJqX7PfO-opodBPQMSTNjYNmKOTxWVitu1oWdCB6hWaXyCma1KwmEZOEbE3jCkjm0ngVbSJKCFhdnGLjzVC7blSEldRXC11bZI7c83jsrUOZJAamudggbbFpDRTmsJj5DPiqGJWu7pEViGvJnmtspsEGoeP2XmO1WvSbKbynCK-D08TRXkYWv_TFx0pGrcOkLAXCXMopRJZt2ftN4" }
];

export default function WardenPortal() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="lg:ml-72 min-h-screen p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.15em] text-secondary font-bold">Management Overview</span>
            <h2 className="text-[2.5rem] font-black text-on-surface tracking-tighter leading-none mt-2">Manage Listings</h2>
            <p className="text-on-surface-variant mt-4 max-w-md leading-relaxed opacity-80">Oversee and optimize your property portfolio within the PeshawarStay ecosystem.</p>
          </div>
          <button className="px-8 py-4 bg-tertiary text-white rounded-full font-bold text-xs uppercase tracking-[0.05em] flex items-center gap-3 shadow-xl active:scale-95 transition-all">
            <Home className="w-4 h-4" />
            Add New Hostel
          </button>
        </header>

        <div className="grid grid-cols-4 gap-6 mb-12">
          {[
            { label: "Total Capacity", val: "482", unit: "Beds" },
            { label: "Monthly Revenue", val: "₨ 2.4M", unit: "↑ 12%", border: true },
            { label: "Active Listings", val: "14", unit: "Units" },
            { label: "Occupancy Rate", val: "94%", progress: 94 }
          ].map((stat, i) => (
            <div key={i} className={cn("bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col justify-between", stat.border && "border-l-4 border-primary/20")}>
              <span className="text-[10px] uppercase tracking-widest text-secondary/60 font-bold">{stat.label}</span>
              <div className="mt-4">
                <span className="text-3xl font-black text-primary tracking-tighter">{stat.val}</span>
                {stat.unit && <span className={cn("text-xs ml-2", stat.unit.includes('↑') ? "text-primary" : "text-secondary")}>{stat.unit}</span>}
                {stat.progress && (
                  <div className="w-full bg-surface-container h-1 rounded-full mt-2">
                    <div className="bg-tertiary h-full rounded-full" style={{ width: `${stat.progress}%` }}></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm">
          <div className="p-8 flex justify-between items-center bg-surface-container-lowest/50 backdrop-blur-md">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/40 w-4 h-4" />
              <input className="w-full pl-10 pr-4 py-2 bg-background border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Filter properties..." type="text"/>
            </div>
            <div className="flex gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary hover:bg-surface-container-high rounded-lg transition-colors">
                <Filter className="w-4 h-4" /> Status
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-secondary hover:bg-surface-container-high rounded-lg transition-colors">
                <Download className="w-4 h-4" /> Export
              </button>
            </div>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-surface-container-high/30">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Property Details</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Revenue</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60">Occupancy</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.1em] text-secondary/60 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {listings.map((item, i) => (
                <tr key={i} className="group hover:bg-surface-container-lowest transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <img src={item.img} className="w-16 h-12 rounded-lg object-cover" alt={item.name} referrerPolicy="no-referrer" />
                      <div>
                        <p className="font-bold text-on-surface">{item.name}</p>
                        <p className="text-xs text-on-surface-variant/70">{item.loc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={cn("px-3 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider", item.status === 'Active' ? "bg-primary/10 text-primary" : "bg-tertiary/10 text-tertiary")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-medium text-sm">₨ {item.rev}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 max-w-[80px] bg-surface-container h-1 rounded-full">
                        <div className={cn("h-full rounded-full", item.occ === 100 ? "bg-tertiary" : "bg-primary")} style={{ width: `${item.occ}%` }}></div>
                      </div>
                      <span className="text-xs font-bold text-secondary">{item.occ}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-primary-fixed transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-tertiary-fixed transition-colors"><Ban className="w-4 h-4" /></button>
                      <button className="w-8 h-8 rounded-full flex items-center justify-center text-error hover:bg-error/10 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-8 py-6 flex justify-between items-center bg-surface-container-high/10">
            <p className="text-xs text-on-surface-variant">Showing 1 to 4 of 14 entries</p>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-secondary transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-xs">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-secondary font-bold text-xs">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface-container-high text-secondary transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
