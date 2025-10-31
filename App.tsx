
import React, { useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import ListingPage from './components/ListingPage';
import DetailPage from './components/DetailPage';
import ConfirmationPage from './components/ConfirmationPage';
import { Category, ListingItem, BookingDetails, View } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedItem, setSelectedItem] = useState<ListingItem | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setView('listing');
  };

  const handleSelectItem = (item: ListingItem) => {
    setSelectedItem(item);
    setView('detail');
  };
  
  const handleBookTicket = (details: BookingDetails) => {
    setBookingDetails(details);
    setView('confirmation');
  };

  const goHome = () => {
    setView('home');
    setSelectedCategory(null);
    setSelectedItem(null);
    setBookingDetails(null);
  };
  
  const goToListing = () => {
      if(selectedCategory){
        setView('listing');
        setSelectedItem(null);
        setBookingDetails(null);
      } else {
        goHome();
      }
  }

  const renderContent = () => {
    switch (view) {
      case 'listing':
        return selectedCategory && <ListingPage category={selectedCategory} onSelectItem={handleSelectItem} onBack={goHome} />;
      case 'detail':
        return selectedCategory && selectedItem && <DetailPage category={selectedCategory} item={selectedItem} onBookTicket={handleBookTicket} onBack={goToListing} />;
      case 'confirmation':
        return bookingDetails && <ConfirmationPage details={bookingDetails} onGoHome={goHome} />;
      case 'home':
      default:
        return <Home onSelectCategory={handleSelectCategory} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <Header onLogoClick={goHome} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;
