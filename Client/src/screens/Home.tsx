import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Search, Map as MapIcon, Wifi, BatteryCharging, Utensils, Wind, Shield, WashingMachine } from 'lucide-react';
import { motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { cn } from '@/src/lib/utils';

const hostels = [
  {
    id: 1,
    name: "The Scholar's Retreat",
    location: "Phase 3, Hayatabad",
    price: "18k",
    gender: "Male",
    tag: "Top Rated",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuASdZclhpVMawI6so4RuKjZQbhxp-syyZZdG1kLq6nfkuaZDsLkXXlPt1tvzppDMaMlrcC6-y2DAXcmPxYWEUn6EVlLhm3QukGO7j2ysllQq3VRpivfDdp0RL0cM_VqYItI8KCyw3I-BD-Glk63ywywHoSRvIY2_FRs-T_5Ggevr8VQXGonvpy4KWq-SE5kU14Kvycs2Qqe4TJ8YpSULtVK0a3Hoyl0_3Dy7VStbjTD6Ggg1Q8qnjNvhQUR1MgFkJN15wrE7U9cTxI",
    amenities: [
      { icon: Wifi, label: "100MB" },
      { icon: BatteryCharging, label: "UPS" },
      { icon: Utensils, label: "Mess" }
    ]
  },
  {
    id: 2,
    name: "Flora Residency",
    location: "University Town",
    price: "22k",
    gender: "Female",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAMQ8KO1RGWnIVVAFlcEjDHQVrKTPUH8Qt01diMvdWPcHapGMUuVAQYfNDmJu12Y6maIwUef743u0p5a7sKYvFNEcrvI4OT8XWL2Q4OaLdQ73Hi56PyaiCs5f7SH0kL6E-SqBwpzjpn2Byh5MLKzhwPF0lsCLai0Hgxs5jfRmf6rEgQ8KzyjsTKBUnXQW5pDYlryj_-tyDOatp0TAhTAKY1I_Mk2_OpJjteUO5GTiK4OsNjnjjrl8C-ylKRtCdQZx7Zg8I2FFC7Ig",
    amenities: [
      { icon: Wifi, label: "Fiber" },
      { icon: Wind, label: "AC" },
      { icon: Shield, label: "CCTV" }
    ]
  },
  {
    id: 3,
    name: "City Edge Lofts",
    location: "Board Bazaar",
    price: "15k",
    gender: "Male",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCJ1LqOWJGPCLoiWUxAfAA10u_YNyqbKVQcuuQGWORe9_AZh_xX-nNaIfZaDHuwPFnA0ByiLx0eN1fQI8wJTBBA_nbGu5D1BtpRvwoLKFep3e3KHMhs60kKgdmDpCGvKu2PyrzzdhTRs6JijGOygZ7xSXhg-TaiJFzWrl37-ELA4Vjlvyj2h_0o51tPpw6GMPk5nIZFFZufxn0WEXtQVJIEEEXAh56KPgENeb-7PMCUCV0rsJMM6bGGyo4pPbP-hFQPgOrm5zfUWt4",
    amenities: [
      { icon: Wifi, label: "Free" },
      { icon: Utensils, label: "Mess" },
      { icon: WashingMachine, label: "Laundry" }
    ]
  }
];

const neighborhoods = [
  {
    name: "Hayatabad",
    count: 12,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuALaCfvX_NVONAUzYlALmBFoaJfBcq0DZkgm7D5EjdzEoTTitQkPjAPAlfNZICWPlTMYAIpuQ9f1U0_lcOT3ALjvqxAeaSNBuCce3NCXcDQcFbq9Pg6xsIT0ilyfJO5hZMsCVik63xIXmjv2jJapopUfd--zfKMijQ4HIH02KNouvsPrPbzhSs-xbT8ss6JqLTOWxm-WnVKjXkOvvX4YCYXNnnwJ3U-aCdL0WC3j5uL6j4XpY1-9KxTrhKNmLeosJtVrdp8d-zjM5I",
    large: true
  },
  {
    name: "University Town",
    count: 8,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC3oM5ouQOFdfxgsop_lFKXNaNAz1hl7QkQRp-Rj_fBI3_007thfTH2XNBW_-TMEw3rDyx37-c_WJWUn_bm-PH2F8o5D_C3wodsmUZoE-OR_z4cysMFOjXsBuCDv1IsXk1rEcqSZ5K-KmQ6QVOljiYEtu8Bpxn3xpV-CDC2lv5PAdPUfjDfbsYWRCwW_niPCWwVMSkR8nBuwLbfKnpiMz1-SRhumTAOLuI4psYjWsZY-Ylj8p_eML3fzXwFG5BTs5gg4i3ud_4We4I"
  },
  {
    name: "Board Bazaar",
    count: 4,
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeuQ3NDsm4eEgDvnPkyZtyKlqDAnotCbSx5OaS8RXRTOoPYJQ8P0mMHBEpEobXKxCovuDpQB0tvzMAWeSDyflyubDYkDSz81mFuIyADH2NBt2XW5Ms2MlIs5FD2rJYxIh1wZboKgUDffyINmttvyFC9zYm6FS8hQfmheNvJRK_L8Xn4_MPYickYxKwrhKnxI8mIbEBM08aytSzU53SDfBDD3b-Srv-i9aMqT2WxbUKF9ZtohvKAzzPul686E_VOmq4MaeV1ROXK-Q"
  }
];

export default function Home() {
  const [dynamicHostels, setDynamicHostels] = useState([]);
  const [locationFilter, setLocationFilter] = useState("All");
  const [genderFilter, setGenderFilter] = useState("All Genders");
  const [loading, setLoading] = useState(true);

  const fetchHostels = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams();
      if (locationFilter && locationFilter !== "All") query.append("location", locationFilter);
      if (genderFilter && genderFilter !== "All Genders") query.append("gender", genderFilter);

      const res = await fetch(`http://localhost:5000/api/hostels?${query.toString()}`);
      const data = await res.json();
      if (data.success) {
        setDynamicHostels(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[716px] flex items-center justify-center px-8 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover brightness-[0.85]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-AEASaioC0PzjjJlh7quNiFxXQ0LybBu61pWG3ggK6GOEIl_mR--IbynLMU8DaoabmChIWJG_FHVNw1hQl90H1y-ok0T9bCUiDV4W1nCXObgWcyrhGiySoTXmWTAZayBv5Po_RLIMwbf5wapTFUdTbLwlAU_kbqra95_V3JLJhr0bULwXxgW5L1pWmpSaw8AgYm0O9VaGdWx6Z5inrNwoNE-zh-p7Y3_run5bLg_G8vcRG65oQpxQfNhXuR_t2o8CMYVmfwRwkcA"
              alt="Hero background"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-surface"></div>
          </div>

          <div className="relative z-10 max-w-4xl w-full text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <span className="inline-block px-4 py-1.5 bg-primary-fixed text-on-primary-fixed rounded-full text-xs font-bold tracking-widest uppercase">
                Premium Student Housing
              </span>
              <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface">
                Find Sanctuary in the <span className="text-primary italic">City of Flowers</span>
              </h1>
              <p className="text-on-surface-variant max-w-2xl mx-auto text-lg leading-relaxed">
                Curated hostels and student residencies across Peshawar's premier locations. Modern living for the modern scholar.
              </p>
            </motion.div>

            {/* Floating Search Portal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-surface-container-lowest/80 backdrop-blur-xl rounded-3xl p-4 editorial-shadow flex flex-col md:flex-row items-center gap-4 max-w-3xl mx-auto"
            >
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl w-full">
                <Search className="w-5 h-5 text-primary" />
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-on-surface font-medium w-full appearance-none">
                  <option value="All">All Areas</option>
                  <option value="University Town">University Town</option>
                  <option value="Hayatabad">Hayatabad</option>
                  <option value="Board Bazaar">Board Bazaar</option>
                </select>
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl w-full">
                <Search className="w-5 h-5 text-primary" />
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-on-surface font-medium w-full appearance-none">
                  <option value="All Genders">All Genders</option>
                  <option value="Male Only">Male Only</option>
                  <option value="Female Only">Female Only</option>
                </select>
              </div>
              <button
                onClick={fetchHostels}
                className="bg-primary hover:bg-secondary text-white w-full md:w-auto px-10 py-4 rounded-2xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2">
                <Search className="w-5 h-5" />
                Discover
              </button>
            </motion.div>
          </div>
        </section>

        {/* Listing Section Header */}
        <section className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Available Residences</h2>
            <p className="text-on-surface-variant">Showing {dynamicHostels.length} properties matching your search in Peshawar</p>
          </div>
          <Link to="/map" className="flex items-center gap-3 px-6 py-3 bg-surface-container-highest rounded-full text-primary font-bold active:scale-95 transition-all editorial-shadow group">
            <MapIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Show Map View
          </Link>
        </section>

        {/* Bento Hostel Grid */}
        <section className="max-w-7xl mx-auto px-8 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {loading ? (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-xl font-bold text-primary animate-pulse">Loading amazing properties...</div>
            ) : dynamicHostels.map((hostel) => (
              <motion.div
                key={hostel._id}
                whileHover={{ y: -8 }}
                className="group bg-surface-container-lowest rounded-[2rem] overflow-hidden editorial-shadow transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    src={hostel.image}
                    alt={hostel.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                      {hostel.gender}
                    </span>
                    {hostel.tag && (
                      <span className="bg-primary/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
                        {hostel.tag}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold leading-tight">{hostel.name}</h3>
                      <p className="text-sm text-on-surface-variant flex items-center gap-1">
                        <Search className="w-3 h-3" /> {hostel.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="block text-2xl font-black text-primary">₨ {hostel.price}</span>
                      <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-widest">per month</span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {/* Map icons conceptually based on string arrays, using generic checkmarks internally for simplification if exact string match isn't standard */}
                    {hostel.amenities && hostel.amenities.map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 bg-surface-container-low px-3 py-2 rounded-xl">
                        <Wifi className="w-4 h-4 text-secondary" />
                        <span className="text-xs font-semibold">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  <Link to={`/hostel/${hostel._id}`} className="w-full bg-tertiary hover:bg-tertiary-container text-white py-4 flex items-center justify-center rounded-full font-bold text-xs uppercase tracking-widest transition-colors active:scale-95">
                    Inquire Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Area Explorer Bento Section */}
        <section className="bg-surface-container-low py-24">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
              <div className="flex-1 space-y-4">
                <h2 className="text-4xl font-black tracking-tight">Explore Key Neighborhoods</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  We’ve handpicked residences in the safest and most convenient pockets of Peshawar, ensuring you stay close to your campus and city life.
                </p>
              </div>
              <button className="bg-primary text-white px-10 py-4 rounded-full font-bold editorial-shadow active:scale-95 transition-all">
                View All Areas
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 h-[600px] gap-6">
              {neighborhoods.map((area) => (
                <div
                  key={area.name}
                  className={cn(
                    "relative rounded-[3rem] overflow-hidden editorial-shadow group cursor-pointer",
                    area.large ? "md:col-span-2 row-span-2" : ""
                  )}
                >
                  <img
                    className="w-full h-full object-cover brightness-[0.7] group-hover:scale-105 transition-transform duration-1000"
                    src={area.image}
                    alt={area.name}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-10 left-10 text-white">
                    <h4 className={cn("font-black mb-2", area.large ? "text-3xl" : "text-2xl")}>{area.name}</h4>
                    <p className="text-white/80 font-medium">{area.count} Residences Available</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
