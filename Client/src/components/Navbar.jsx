import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md flex justify-between items-center px-8 h-20 max-w-full mx-auto shadow-sm">
      <Link to="/" className="text-2xl font-black text-primary tracking-tighter">Qayam</Link>

      <div className="hidden md:flex items-center gap-8">
        <Link
          to="/"
          className={cn(
            "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
            location.pathname === '/' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
          )}
        >
          Discover
        </Link>
        <Link
          to="/areas"
          className={cn(
            "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
            location.pathname === '/areas' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
          )}
        >
          Areas
        </Link>
        <Link
          to="/map"
          className={cn(
            "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
            location.pathname === '/map' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
          )}
        >
          Map View
        </Link>
        <Link
          to="/contact"
          className={cn(
            "font-medium text-sm tracking-tight transition-all duration-300 pb-1",
            location.pathname === '/contact' ? "text-primary border-b-2 border-primary" : "text-on-surface opacity-70 hover:opacity-100"
          )}
        >
          Contact Us
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/signup" className="hidden lg:block text-primary font-medium text-sm px-4 py-2 rounded-lg active:scale-95 transition-transform">
          List Your Hostel
        </Link>
        <Link to="/login" className="bg-primary text-white px-6 py-2.5 rounded-full font-semibold text-sm active:scale-95 transition-transform shadow-lg shadow-primary/20">
          Sign In
        </Link>
      </div>
    </nav>
  );
}
