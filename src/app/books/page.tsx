'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Book } from '@/types';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setError(null);
      const { data, error: err } = await supabase
        .from('books')
        .select('*')
        .order('id', { ascending: true });

      if (err) throw err;
      setBooks(data);
    } catch (e) {
      setError('Error loading books');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Elige un Libro
          </h1>
        </div>

        {books && books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`}>
                <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg p-8 text-white cursor-pointer transform transition hover:scale-105">
                  <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                  <p className="text-white/90">{book.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 text-lg">No books available</p>
          </div>
        )}
      </div>
    </div>
  );
}
