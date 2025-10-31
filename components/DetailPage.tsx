import React, { useState, useEffect, useCallback } from 'react';
import { Category, ListingItem, ItemDetails, BookingDetails, MovieDetails, ConcertDetails, FlightDetails, SportsDetails } from '../types';
import { generateDetails } from '../services/geminiService';
import Spinner from './Spinner';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface DetailPageProps {
  category: Category;
  item: ListingItem;
  onBookTicket: (details: BookingDetails) => void;
  onBack: () => void;
}

const DetailRenderer: React.FC<{ details: ItemDetails, categoryId: string }> = ({ details, categoryId }) => {
    if (categoryId === 'movies' && details) {
        const d = details as MovieDetails;
        return (
            <>
                <p className="text-lg text-gray-300 mt-4">{d.synopsis}</p>
                <div className="mt-6 space-y-3 text-gray-400">
                    <p><strong>Rating:</strong> {d.rating}</p>
                    <p><strong>Duration:</strong> {d.duration}</p>
                    <p><strong>Director:</strong> {d.director}</p>
                    <p><strong>Cast:</strong> {d.cast?.join(', ')}</p>
                </div>
            </>
        )
    }
    if (categoryId === 'concerts' && details) {
        const d = details as ConcertDetails;
        return (
             <>
                <p className="text-lg text-gray-300 mt-4">{d.artistBio}</p>
                <div className="mt-6 space-y-3 text-gray-400">
                    <p><strong>Venue:</strong> {d.venue}</p>
                    <p><strong>Date:</strong> {d.date}</p>
                    <p><strong>Popular Songs:</strong> {d.popularSongs?.join(', ')}</p>
                </div>
            </>
        )
    }
     if (categoryId === 'flights' && details) {
        const d = details as FlightDetails;
        return (
             <>
                <p className="text-lg text-gray-300 mt-4">Review your flight details before booking.</p>
                <div className="mt-6 space-y-3 text-gray-400">
                    <p><strong>Flight Number:</strong> {d.flightNumber}</p>
                    <p><strong>Departure:</strong> {d.departureTime}</p>
                    <p><strong>Arrival:</strong> {d.arrivalTime}</p>
                    <p><strong>Duration:</strong> {d.duration}</p>
                    <p><strong>Layovers:</strong> {d.layovers}</p>
                    <p><strong>Aircraft:</strong> {d.aircraft}</p>
                </div>
            </>
        )
    }
    if (categoryId === 'sports' && details) {
        const d = details as SportsDetails;
        return (
             <>
                <p className="text-lg text-gray-300 mt-4">Get ready for an exciting match!</p>
                <div className="mt-6 space-y-3 text-gray-400">
                    <p><strong>Match:</strong> {d.match}</p>
                    <p><strong>League:</strong> {d.league}</p>
                    <p><strong>Venue:</strong> {d.venue}</p>
                    <p><strong>Date:</strong> {d.date}</p>
                    <p><strong>Teams:</strong> {d.teams?.join(' vs ')}</p>
                </div>
            </>
        )
    }
    return <p className="text-gray-400 mt-4">Details not available.</p>;
}

const BookingForm: React.FC<{ onSubmit: (tickets: number, name: string, email: string, paymentMethod: string) => void }> = ({ onSubmit }) => {
    const [tickets, setTickets] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(name && email && tickets > 0) {
            onSubmit(tickets, name, email, paymentMethod);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-8 bg-slate-800 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-white mb-4">Book Your Tickets</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-violet-500 focus:border-violet-500"/>
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-violet-500 focus:border-violet-500"/>
                </div>
                <div>
                    <label htmlFor="tickets" className="block text-sm font-medium text-gray-300">Number of Tickets</label>
                    <input type="number" id="tickets" value={tickets} onChange={(e) => setTickets(Math.max(1, parseInt(e.target.value)))} min="1" required className="mt-1 block w-full bg-slate-700 border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-violet-500 focus:border-violet-500"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-300">Payment Method</label>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                        {['Credit Card', 'PayPal', 'Google Pay'].map((method) => (
                            <label key={method} className="flex items-center space-x-2 text-white cursor-pointer">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value={method}
                                    checked={paymentMethod === method}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="h-4 w-4 text-violet-600 bg-slate-700 border-slate-600 focus:ring-violet-500 focus:ring-offset-slate-800"
                                />
                                <span>{method}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <button type="submit" className="mt-6 w-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-bold py-3 px-4 rounded-md hover:opacity-90 transition-opacity duration-300">
                Confirm Booking
            </button>
        </form>
    );
};

const DetailPage: React.FC<DetailPageProps> = ({ category, item, onBookTicket, onBack }) => {
  const [details, setDetails] = useState<ItemDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    setIsLoading(true);
    const fetchedDetails = await generateDetails(category, item.title);
    setDetails(fetchedDetails);
    setIsLoading(false);
  }, [category, item.title]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleBookingSubmit = (tickets: number, name: string, email: string, paymentMethod: string) => {
    onBookTicket({ item, category, tickets, name, email, paymentMethod });
  };
  
  return (
    <div className="container mx-auto p-4 md:p-8">
       <button onClick={onBack} className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-8 font-semibold">
            <ChevronLeftIcon className="h-5 w-5" />
            Back to Listings
        </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <img src={`https://picsum.photos/seed/${item.id}/1280/720`} alt={item.title} className="w-full h-full object-cover"/>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 p-6">
                    <p className="text-lg font-semibold text-violet-300">{item.subtitle}</p>
                    <h2 className="text-4xl font-extrabold text-white">{item.title}</h2>
                 </div>
            </div>
            <div className="mt-8">
                 {isLoading ? <Spinner/> : details ? <DetailRenderer details={details} categoryId={category.id} /> : <p className="text-red-400">Failed to load details.</p>}
            </div>
        </div>
        <div>
            <BookingForm onSubmit={handleBookingSubmit} />
        </div>
      </div>
    </div>
  );
};

export default DetailPage;