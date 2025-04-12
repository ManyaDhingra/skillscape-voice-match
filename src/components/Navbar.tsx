
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path ? "text-white font-bold" : "text-blue-100 hover:text-white";
  };

  return (
    <header className="bg-[#1EAEDB] text-white py-6 px-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SkillScape</Link>
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className={isActive('/')}>Home</Link>
          <Link to="/map" className={isActive('/map')}>Find Skills</Link>
          <Link to="/skills" className={isActive('/skills')}>Skills</Link>
          {user && <Link to="/dashboard" className={isActive('/dashboard')}>Dashboard</Link>}
        </nav>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/profile" className="flex items-center gap-2">
                <div className="bg-white text-[#1EAEDB] rounded-full p-1">
                  <User size={18} />
                </div>
                <span className="hidden md:inline">{user.email}</span>
              </Link>
              <Button 
                variant="ghost" 
                className="text-white hover:bg-blue-600" 
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden md:inline ml-2">Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#1EAEDB]">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-white text-[#1EAEDB] hover:bg-blue-100">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
