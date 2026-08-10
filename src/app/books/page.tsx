'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Book } from '@/types';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">Cargando...</div>
      </div>
    );
  }

  const levelColors = {
    INITIAL: 'from-red-500 to-red-600',
    INTERMEDIATE: 'from-green-500 to-green-600',
    ADVANCED: 'from-blue-500 to-blue-600',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            📚 Elige un Libro
          </h1>
          <p className="text-xl text-gray-600">
            Selecciona el nivel que deseas estudiar
          </p>
        </div>

        {/* Libros Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book) => (
            <Link key={book.id} href={`/books/${book.id}`}>
              <div
                className={`bg-gradient-to-br ${
                  levelColors[book.level as keyof typeof levelColors]
                } rounded-xl shadow-lg p-8 text-white cursor-pointer transform transition hover:scale-105 hover:shadow-2xl h-full`}
              >
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <div className="inline-block bg-white text-gray-800 px-3 py-1 rounded-full text-sm font-bold mb-4">
                      {book.level}
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{book.title}</h3>
                    <p className="text-white/90">{book.description}</p>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-semibold opacity-75">
                      Click para comenzar →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}