
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category } from '../types';

interface HomeProps {
  onSelectCategory: (category: Category) => void;
}

const CategoryCard: React.FC<{ category: Category; onSelect: () => void }> = ({ category, onSelect }) => (
    <div 
        onClick={onSelect}
        className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 transform hover:-translate-y-2"
    >
        <img 
            src={`https://picsum.photos/seed/${category.id}/800/1000`} 
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 text-white">
            <h3 className="text-3xl font-bold">{category.name}</h3>
            <p className="text-sm mt-1 text-gray-300 group-hover:text-white transition-colors">{category.description}</p>
        </div>
    </div>
);

const Home: React.FC<HomeProps> = ({ onSelectCategory }) => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white">Your Universal Ticket Hub</h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">From blockbuster movies to globetrotting flights, your next adventure starts here.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {CATEGORIES.map((category) => (
          <CategoryCard 
            key={category.id} 
            category={category}
            onSelect={() => onSelectCategory(category)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
