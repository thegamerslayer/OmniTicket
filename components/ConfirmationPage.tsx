import React from 'react';
import { BookingDetails } from '../types';
import TicketIcon from './icons/TicketIcon';

interface ConfirmationPageProps {
  details: BookingDetails;
  onGoHome: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ details, onGoHome }) => {
  if (!details) {
    return (
      <div className="text-center p-8 text-white">
        <h2 className="text-2xl font-bold">No booking details found.</h2>
        <button onClick={onGoHome} className="mt-4 bg-violet-600 text-white font-bold py-2 px-4 rounded-md">Go Home</button>
      </div>
    );
  }

  const { item, category, tickets, name, email, paymentMethod } = details;

  return (
    <div className="container mx-auto p-4 md:p-8 max-w-2xl">
      <div className="bg-slate-800 rounded-xl shadow-2xl shadow-violet-500/10 p-8 text-center">
        <div className="mx-auto bg-green-500 rounded-full h-16 w-16 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-extrabold text-white mt-6">Booking Confirmed!</h2>
        <p className="text-gray-400 mt-2">Your tickets have been sent to <span className="font-bold text-violet-400">{email}</span>.</p>
        
        <div className="mt-8 text-left bg-slate-900 rounded-lg p-6 border border-slate-700 relative">
          <div className="absolute -top-4 -left-4">
            <TicketIcon className="h-8 w-8 text-violet-500" />
          </div>
          <h3 className="text-xl font-bold text-white">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.subtitle}</p>
          <div className="border-t border-dashed border-slate-600 my-4"></div>
          <div className="space-y-2 text-gray-300">
            <div className="flex justify-between"><span>Category:</span> <span className="font-semibold">{category.name}</span></div>
            <div className="flex justify-between"><span>Booked for:</span> <span className="font-semibold">{name}</span></div>
            <div className="flex justify-between"><span>Tickets:</span> <span className="font-semibold">{tickets}</span></div>
            <div className="flex justify-between"><span>Payment Method:</span> <span className="font-semibold">{paymentMethod}</span></div>
             {item.price && (
                <div className="flex justify-between text-lg text-white font-bold pt-2 mt-2 border-t border-slate-700">
                    <span>Total Price:</span> 
                    <span>${(item.price * tickets).toFixed(2)}</span>
                </div>
            )}
          </div>
        </div>

        <button 
          onClick={onGoHome} 
          className="mt-8 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity duration-300"
        >
          Book Another Ticket
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;