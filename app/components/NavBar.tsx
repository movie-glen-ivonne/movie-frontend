'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../context/AuthContext';
import Link from 'next/link'
import Image from 'next/image'

const navigation = [
  { name: 'Search', href: '/' },
  { name: 'My Library', href: '/library' },
]

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { isAuthenticated, loading, logout } : any = useAuth();

  return (
    <header>
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Netflix</span>
            <img
              alt="netflix logo"
              src="/image.png"
              className="h-8 w-auto"
              width={500} 
              height={300}
            />
          </Link>
        </div>
        {!isAuthenticated && (
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white-900">
                {item.name}
              </a>
            ))}
          </div>
        )}

        {isAuthenticated && !loading && (

          <div className="flex flex-1 items-center justify-end gap-x-6">
            <a href="/login" className="hidden text-sm/6 font-semibold text-white-900 lg:block">
              Log in
            </a>
            <a
              href="/register"
              style={{ backgroundColor: '#e50914' }}
              className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign up
            </a>
          </div>

        )} 

        {isAuthenticated && (
            <div className="flex flex-1 items-center justify-end gap-x-6">
              <button
                onClick={logout}
                style={{ backgroundColor: '#e50914' }}
                className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Logout
              </button>
            </div>
        )}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center gap-x-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Bauhaus</span>
              <img
                alt=""
                src="/image.png"
                className="h-8 w-auto"
                width={500} 
                height={300}
              />
            </a>
            {!isAuthenticated && !loading && (
              <a
                href="/register"
                style={{ backgroundColor: '#e50914' }}
                className="ml-auto rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </a>
            )}
            {isAuthenticated && (
                <div className="flex flex-1 items-center justify-end gap-x-6">
                  <button
                    style={{ backgroundColor: '#e50914' }}
                    onClick={logout}
                    className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Logout
                  </button>
                </div>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2 rounded-md p-2.5 text-white-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-white-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white-900 hover:bg-gray-50 hover:text-black"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              {!isAuthenticated && !loading && (
                <div className="py-6">
                  <a
                    href="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white-900 hover:bg-gray-50 hover:text-black"
                  >
                    Log in
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}