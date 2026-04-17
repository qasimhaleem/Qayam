import React, { useState, useEffect } from 'react';
import { Building2, CloudUpload, Check, X, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const AMENITIES_LIST = ['WiFi', 'AC', 'Geyser', 'Laundry', 'Parking', 'Kitchen', 'Mess', 'UPS/Generator', 'CCTV', 'Study Room'];

export default function HostelForm({ editingId, initialData, onSuccess, onCancel }) {
  const [hostelType, setHostelType] = useState('Boys');
  const [furnished, setFurnished] = useState('Furnished');
  const [name, setName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [rent, setRent] = useState('');
  const [rooms, setRooms] = useState('');
  const [description, setDescription] = useState('');
  
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [imageBase64, setImageBase64] = useState('');
  
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setHostelType(initialData.gender || 'Boys');
      setFurnished(initialData.furnished || 'Furnished');
      setContactNumber(initialData.contactNumber || '');
      setCity(initialData.city || '');
      setArea(initialData.area || initialData.location || '');
      setAddress(initialData.address || '');
      setRent(initialData.price ? initialData.price.toString() : '');
      setRooms(initialData.capacity ? initialData.capacity.toString() : '');
      setDescription(initialData.description || '');
      setLat(initialData.coordinates?.lat ? initialData.coordinates.lat.toString() : '');
      setLng(initialData.coordinates?.lng ? initialData.coordinates.lng.toString() : '');
      setSelectedAmenities(initialData.amenities || []);
      setImageBase64(initialData.image && initialData.image.includes('placeholder') ? '' : (initialData.image || ''));
    }
  }, [initialData]);

  const toggleAmenity = (amenity) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
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

      let parsedLat = parseFloat(lat);
      let parsedLng = parseFloat(lng);
      const coordinates = (!isNaN(parsedLat) && !isNaN(parsedLng)) 
        ? { lat: parsedLat, lng: parsedLng } 
        : undefined;

      const payload = {
        name,
        gender: hostelType,
        furnished,
        contactNumber,
        city,
        area,
        address,
        description,
        location: area || city,
        capacity: parseInt(rooms) || 0,
        price: rent,
        wardenName,
        amenities: selectedAmenities,
        coordinates,
        image: imageBase64 || 'https://via.placeholder.com/400x300'
      };

      const url = editingId 
        ? `http://localhost:5000/api/hostels/${editingId}`
        : 'http://localhost:5000/api/hostels';
        
      const method = editingId ? 'PUT' : 'POST';

      const actionRes = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const addData = await actionRes.json();
      if (addData.success) {
        onSuccess();
      } else {
        setMessage(addData.error || 'Failed to save hostel');
      }
    } catch (err) {
      setMessage(err.message || 'Error executing request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 editorial-shadow">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-bold tracking-tight text-on-surface">
          {editingId ? 'Edit Hostel Listing' : 'Add New Hostel'}
        </h3>
        {onCancel && (
          <button onClick={onCancel} type="button" className="text-xs flex items-center gap-1 font-bold text-error bg-error/10 px-3 py-1.5 rounded-full">
            <X className="w-3 h-3"/> Cancel
          </button>
        )}
      </div>
      
      {message && <div className="mb-4 p-3 bg-secondary text-white text-xs font-bold rounded-lg">{message}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Pin Location UI */}
        <div className="space-y-2 bg-surface-container-low/50 p-4 rounded-xl border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-tertiary w-4 h-4" />
            <label className="text-xs font-bold uppercase tracking-wider text-secondary">Pin Location (Map View)</label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input value={lat} onChange={e => setLat(e.target.value)} className="w-full bg-white border border-surface-container-high rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-xs" placeholder="Latitude e.g. 34.0150" type="number" step="any" />
            <input value={lng} onChange={e => setLng(e.target.value)} className="w-full bg-white border border-surface-container-high rounded-lg py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-xs" placeholder="Longitude e.g. 71.5805" type="number" step="any" />
          </div>
          <p className="text-[10px] text-on-surface-variant font-medium mt-1">Provide exact coordinates so students can locate your property on the map view.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Type*</label>
            <select value={hostelType} onChange={e => setHostelType(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
              <option value="Boys">Boys</option>
              <option value="Girls">Girls</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Furnished*</label>
            <select value={furnished} onChange={e => setFurnished(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all appearance-none">
              <option value="Furnished">Furnished</option>
              <option value="Unfurnished">Unfurnished</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Name*</label>
          <input value={name} onChange={e => setName(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all placeholder:opacity-50" placeholder="e.g. Al-Noor Boys Hostel" type="text" />
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Contact Number*</label>
          <input value={contactNumber} onChange={e => setContactNumber(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 03xx xxxxxxx" type="text" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">City*</label>
            <input value={city} onChange={e => setCity(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="City" type="text" />
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Area*</label>
            <input value={area} onChange={e => setArea(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. Hayatabad Phase 3" type="text" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Full Address*</label>
          <textarea value={address} onChange={e => setAddress(e.target.value)} required className="w-full min-h-[80px] bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-y" placeholder="Complete street address..."></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Monthly Rent per Bed (PKR)*</label>
            <input value={rent} onChange={e => setRent(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="e.g. 8000" type="number" />
            <p className="text-[10px] text-on-surface-variant italic">This will be shown as the starting price on your listing</p>
          </div>
          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Total Beds Available*</label>
            <input value={rooms} onChange={e => setRooms(e.target.value)} required className="w-full bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all" placeholder="40" type="number" />
          </div>
        </div>
        
        <div className="space-y-2 border-t border-surface-container-high pt-6">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Amenities</label>
          <div className="flex flex-wrap gap-2">
            {AMENITIES_LIST.map((amenity) => {
              const isSelected = selectedAmenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-bold border transition-colors flex items-center gap-1.5",
                    isSelected 
                      ? "bg-primary border-primary text-white" 
                      : "bg-transparent border-surface-container-high text-on-surface-variant hover:border-primary/50"
                  )}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full min-h-[100px] bg-surface-container-low border-0 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all resize-y" placeholder="Any additional information about rules, nearby spots, meals..."></textarea>
        </div>

        <div className="space-y-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-secondary">Hostel Image</label>
          <label className="relative w-full aspect-video bg-surface-container overflow-hidden rounded-xl border-2 border-dashed border-on-surface-variant/20 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-surface-container-high transition-colors group">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
            {imageBase64 ? (
              <img src={imageBase64} className="w-full h-full object-cover" alt="Preview" />
            ) : (
              <>
                <CloudUpload className="w-10 h-10 text-primary/40 group-hover:text-primary transition-colors" />
                <p className="text-xs font-medium text-on-surface-variant">Click to upload image</p>
                <p className="text-[10px] text-on-surface-variant/50">JPG, PNG up to 5MB</p>
              </>
            )}
          </label>
        </div>
        
        <button disabled={loading} className="w-full bg-tertiary text-white py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all mt-4 shadow-lg shadow-tertiary/20 flex justify-center items-center" type="submit">
          {loading ? 'Submitting...' : (editingId ? 'Update Listing Details' : 'Upload Hostel Listing')}
        </button>
      </form>
    </div>
  );
}
