'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Book } from '@/types';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('books')
        .select('*')
        .order('id', { ascending: true });

      if (fetchError) {
        throw new Error(fetchError.message);
      }
      setBooks(data || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('Error al cargar los libros. Verifica tu conexión a Supabase.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg">
          <p className="font-semibold mb-2">Error</p>
          <p>{error}</p>
          <button
            onClick={fetchBooks}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
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
        {books.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No hay libros disponibles por el momento.
            </p>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
