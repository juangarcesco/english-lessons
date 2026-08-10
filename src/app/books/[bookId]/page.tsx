'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Book, Lesson } from '@/types';

export default function LessonsPage() {
  const params = useParams();
  const bookId = params.bookId;
  const [book, setBook] = useState<Book | null>(null);
  const [lessons, setLessons] = useState<Lesson[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [bookId]);

  const fetchData = async () => {
    try {
      const { data: bookData } = await supabase
        .from('books')
        .select('*')
        .eq('id', bookId)
        .single();

      setBook(bookData);

      const { data: lessonsData } = await supabase
        .from('lessons')
        .select('*')
        .eq('book_id', bookId)
        .order('lesson_number', { ascending: true });

      setLessons(lessonsData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!book) {
    return <div className="flex items-center justify-center min-h-screen">Book not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link href="/books">
          <button className="mb-8 text-indigo-600 font-semibold">
            Back to Books
          </button>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            {book.title}
          </h1>
          <p className="text-lg text-gray-600">{book.description}</p>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Lecciones
        </h2>

        {lessons && lessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lessons.map((lesson) => (
              <Link
                key={lesson.id}
                href={`/books/${bookId}/lessons/${lesson.id}`}
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 cursor-pointer transform hover:scale-105">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{lesson.description}</p>
                  <div className="text-blue-600 font-semibold">
                    Start
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600">No lessons available</p>
          </div>
        )}
      </div>
    </div>
  );
}
