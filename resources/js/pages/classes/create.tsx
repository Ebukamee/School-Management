import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Classes', href: '/classes' },
    { title: 'Add Class', href: '/classes/create' }
];

export default function CreateClass() {
  const { data, setData, post, processing, errors } = useForm({
    subject: '',
    grade_level: '',
    day: 'Monday',
    start_time: '',
    end_time: '',
    room: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/classes');
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Class" />
      
      <div className="p-6 max-w-2xl mx-auto bg-white shadow-sm rounded-lg mt-8 border border-gray-100">
        <h1 className="text-2xl font-bold mb-6 text-[#37368b]">Add Class to Timetable</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Subject</label>
            <input 
              type="text" 
              value={data.subject} 
              onChange={e => setData('subject', e.target.value)}
              className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]" 
              placeholder="e.g. Mathematics" 
            />
            {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
          </div>

          {/* Grade Level */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Class / Grade Level</label>
            <input 
              type="text" 
              value={data.grade_level} 
              onChange={e => setData('grade_level', e.target.value)}
              className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]" 
              placeholder="e.g. SS2" 
            />
             {errors.grade_level && <p className="text-red-500 text-xs mt-1">{errors.grade_level}</p>}
          </div>

          {/* Day of Week */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-700">Day</label>
            <select 
              value={data.day} 
              onChange={e => setData('day', e.target.value)}
              className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]"
            >
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Time & Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Start Time</label>
              <input 
                type="time" 
                value={data.start_time} 
                onChange={e => setData('start_time', e.target.value)}
                className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]" 
              />
              {errors.start_time && <p className="text-red-500 text-xs mt-1">{errors.start_time}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">End Time</label>
              <input 
                type="time" 
                value={data.end_time} 
                onChange={e => setData('end_time', e.target.value)}
                className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]" 
              />
               {errors.end_time && <p className="text-red-500 text-xs mt-1">{errors.end_time}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">Room (Optional)</label>
              <input 
                type="text" 
                value={data.room} 
                onChange={e => setData('room', e.target.value)}
                className="w-full border-gray-300 rounded-md focus:border-[#37368b] focus:ring-[#37368b]" 
                placeholder="Room 101" 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button 
              type="submit" 
              disabled={processing}
              className="w-full bg-[#37368b] text-white py-2.5 rounded-lg font-semibold hover:bg-[#2a2970] transition shadow-md disabled:opacity-50"
            >
              {processing ? 'Saving...' : 'Add to Schedule'}
            </button>
          </div>

        </form>
      </div>
    </AppLayout>
  );
}