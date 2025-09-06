import React, { useMemo, useState } from 'react';
import { Calendar, Clock, User, MapPin, Plus, Filter, Search } from 'lucide-react';
import { bookingService, type Booking } from '../services/bookings';

interface TherapySchedulingProps {
  userRole: 'patient' | 'practitioner' | 'admin';
}

export const TherapyScheduling: React.FC<TherapySchedulingProps> = ({ userRole }) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTherapy, setSelectedTherapy] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [note, setNote] = useState('');

  const therapyTypes = [
    { id: 'abhyanga', name: 'Abhyanga Massage', duration: '90 min', price: '₹3,500' },
    { id: 'shirodhara', name: 'Shirodhara', duration: '60 min', price: '₹4,000' },
    { id: 'nasya', name: 'Nasya Therapy', duration: '45 min', price: '₹2,800' },
    { id: 'basti', name: 'Basti Treatment', duration: '120 min', price: '₹5,500' },
    { id: 'udvartana', name: 'Udvartana', duration: '75 min', price: '₹3,200' },
  ];

  const timeSlots = [
    '9:00 AM', '10:30 AM', '12:00 PM', '1:30 PM', '3:00 PM', '4:30 PM', '6:00 PM'
  ];

  // Load bookings from storage
  const upcomingAppointments = useMemo(() => bookingService.getAll(), []);

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTherapy || !selectedDate || !selectedTime) return;
    const therapy = therapyTypes.find(t => t.id === selectedTherapy);
    if (!therapy) return;
    const newBooking: Booking = {
      id: crypto.randomUUID(),
      date: selectedDate,
      time: selectedTime,
      therapyId: therapy.id,
      therapyName: therapy.name,
      practitioner: 'TBD Practitioner',
      status: 'pending',
      patient: userRole === 'practitioner' ? 'TBD Patient' : undefined,
      notes: note || undefined,
    };
    bookingService.add(newBooking);
    // Reset and close
    setSelectedDate('');
    setSelectedTime('');
    setSelectedTherapy('');
    setNote('');
    setShowBookingModal(false);
    // Force a refresh by replacing location (simple approach without global state)
    if (typeof window !== 'undefined') window.location.reload();
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Therapy Scheduling</h1>
          <p className="text-gray-600">
            {userRole === 'patient' 
              ? 'Book and manage your Panchakarma therapy sessions' 
              : 'Manage appointments and availability'
            }
          </p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>{userRole === 'patient' ? 'Book Session' : 'Add Appointment'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar and Booking */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Filters */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search therapies or practitioners..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex space-x-2">
                <select className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option value="">All Therapies</option>
                  {therapyTypes.map((therapy) => (
                    <option key={therapy.id} value={therapy.id}>{therapy.name}</option>
                  ))}
                </select>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Therapy Selection */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Therapies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {therapyTypes.map((therapy) => (
                <div
                  key={therapy.id}
                  className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedTherapy === therapy.id 
                      ? 'border-emerald-500 bg-emerald-50' 
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                  onClick={() => setSelectedTherapy(therapy.id)}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{therapy.name}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {therapy.duration}
                    </span>
                    <span className="font-medium text-emerald-600">{therapy.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          {selectedTherapy && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Available Time Slots</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-3 border rounded-lg text-center transition-colors ${
                      selectedTime === time
                        ? 'bg-emerald-50 border-emerald-300'
                        : 'border-gray-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900">{time}</div>
                    <div className="text-xs text-emerald-600">Available</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              {userRole === 'patient' ? 'Your Appointments' : 'Upcoming Sessions'}
            </h3>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border border-gray-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{appointment.therapyName}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      {appointment.patient || appointment.practitioner}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {/* Deterministic room number derived from id to avoid layout thrash */}
                      Room {((Array.from(appointment.id).reduce((a, c) => a + c.charCodeAt(0), 0)) % 10) + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4">Booking Guidelines</h3>
            <div className="space-y-3 text-sm text-emerald-700">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span>Book sessions at least 24 hours in advance</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span>Arrive 15 minutes before your appointment</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span>Cancellations allowed up to 12 hours prior</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                <span>Prepare according to therapy-specific instructions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Book New Session</h2>
            <form className="space-y-4" onSubmit={submitBooking}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Therapy Type</label>
                <select 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={selectedTherapy}
                  onChange={(e) => setSelectedTherapy(e.target.value)}
                  required
                >
                  <option value="">Select therapy...</option>
                  {therapyTypes.map((therapy) => (
                    <option key={therapy.id} value={therapy.id}>{therapy.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                <select 
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                >
                  <option value="">Select time...</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements</label>
                <textarea
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500"
                  rows={3}
                  placeholder="Any specific needs or concerns..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Book Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};