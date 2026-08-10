'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Book, Lesson } from '@/types';

export default function LessonsPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const [book, setBook] = useState<Book | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [bookId]);

  const fetchData = async () => {
    try {
      const { data: bookData, error: bookError } = await supabase
        .from('books')
        .select('*')
        .eq('id', bookId)
        .single();

      if (bookError) throw bookError;
      setBook(bookData);

      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('book_id', bookId)
        .order('lesson_number', { ascending: true });

      if (lessonsError) throw lessonsError;
      setLessons(lessonsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
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

  if (!book) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold text-gray-600">
          Libro no encontrado
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header con botón back */}
        <Link href="/books">
          <button className="mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Volver a Libros
          </button>
        </Link>

        {/* Info del libro */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600">{book.description}</p>
          <span className="inline-block bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold mt-4">
            {book.level}
          </span>
        </div>

        {/* Lecciones */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            📖 Lecciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/books/${bookId}/lessons/${lesson.id}`}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-6 cursor-pointer transform hover:scale-105">
                  <div className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                    Lección {lesson.lesson_number}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <div className="flex items-center gap-2 text-blue-600 font-semibold">
                    Comenzar →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}