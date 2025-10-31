
import React from 'react';
import TicketIcon from './icons/TicketIcon';

interface HeaderProps {
    onLogoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  return (
    <header className="bg-slate-900/80 backdrop-blur-sm p-4 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={onLogoClick}
        >
          <TicketIcon className="h-8 w-8 text-violet-400" />
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Omni<span className="text-violet-400">Ticket</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
