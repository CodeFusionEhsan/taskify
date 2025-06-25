import React from 'react';
import Link from 'next/link';
import { Jost } from 'next/font/google';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

const jost = Jost({ subsets: ['latin'], weight: ['400', '600'] });

const Navbar: React.FC = () => {
  return (
    <nav className={`${jost.className} bg-white shadow-md py-4 px-6 flex flex-row sm:flex-row justify-between items-center`}>
      <div className="flex flex-row sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
        <div className="sm:text-5xl text-2xl font-semibold text-gray-800">Taskify</div>
        <div className="sm:text-xl text-sm text-gray-500 sm:pt-2 top-[-10px] pl-2">
          Developed By{' '}
          <a
            href="https://linkedin.com/in/ehsan-saleem-web3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline top-[-20px]"
          >
            Ehsan Saleem
          </a>
        </div>
      </div>
      <div className="mt-2 sm:mt-0">
        <SignedIn>
          <div className='sm:pt-3'>
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
            <SignInButton />
          </div>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Navbar;
