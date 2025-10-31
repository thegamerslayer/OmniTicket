
import React, { useState, useEffect } from 'react';
import { Category, ListingItem } from '../types';
import { generateListings } from '../services/geminiService';
import Spinner from './Spinner';
import ChevronLeftIcon from './icons/ChevronLeftIcon';

interface ListingPageProps {
  category: Category;
  onSelectItem: (item: ListingItem) => void;
  onBack: () => void;
}

const ListingCard: React.FC<{ item: ListingItem, categoryId: string, onSelect: () => void }> = ({ item, categoryId, onSelect }) => (
    <div 
        onClick={onSelect}
        className="bg-slate-800 rounded-lg overflow-hidden group cursor-pointer transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-violet-500/20"
    >
        <div className="relative h-56">
            <img 
                src={`https://picsum.photos/seed/${item.id}/600/400`} 
                alt={item.title} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors"></div>
        </div>
        <div className="p-4">
            <p className="text-sm text-violet-400 font-semibold">{item.subtitle}</p>
            <h3 className="text-xl font-bold text-white mt-1 truncate">{item.title}</h3>
            <p className="text-gray-400 text-sm mt-2 h-10 overflow-hidden">{item.description}</p>
            {item.price && (
                <p className="text-lg font-bold text-teal-400 mt-2">${item.price.toFixed(2)}</p>
            )}
        </div>
    </div>
);


const ListingPage: React.FC<ListingPageProps> = ({ category, onSelectItem, onBack }) => {
  const [items, setItems] = useState<ListingItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      const fetchedItems = await generateListings(category);
      setItems(fetchedItems);
      setIsLoading(false);
    };
    fetchItems();
  }, [category]);

  return (
    <div className="container mx-auto p-4 md:p-8">
      <button onClick={onBack} className="flex items-center gap-2 text-violet-400 hover:text-violet-300 mb-8 font-semibold">
        <ChevronLeftIcon className="h-5 w-5" />
        Back to Categories
      </button>

      <h2 className="text-4xl font-extrabold text-white mb-2">Now Showing: {category.name}</h2>
      <p className="text-lg text-gray-400 mb-8">{category.description}</p>
      
      {isLoading ? (
        <div className="h-96 flex items-center justify-center">
            <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {items.map((item) => (
            <ListingCard key={item.id} item={item} categoryId={category.id} onSelect={() => onSelectItem(item)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingPage;
