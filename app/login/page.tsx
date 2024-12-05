'use client'

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
export default function LogIn() {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const { login, loading, isAuthenticated } = useAuth() ?? { login: () => Promise.resolve({ message: '', user: null }), loading: true, isAuthenticated: false };;

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log('here')
    const response = await login(email, password);

    if (response.user) {
      router.push('/')
    }
    else {
      alert(response.message)
    }

  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            alt="Bauhaus"
            src="/image.png"
            className="mx-auto h-10 w-auto"
            width={500}
            height={300}
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-white-900">
                Email address*
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-white-900">
                  Password*
                </label>
              </div>
              <div className="mt-2 mb-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                style={{ backgroundColor: '#e50914' }}
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

        </div>
      </div>
    </>
  )
}