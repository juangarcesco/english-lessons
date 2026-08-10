'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import LessonViewer from '@/components/LessonViewer';
import { Lesson } from '@/types';

export default function LessonPage() {
  const params = useParams();
  const bookId = params.bookId as string;
  const lessonId = params.lessonId as string;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLesson();
  }, [lessonId, bookId]);

  const fetchLesson = async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .eq('book_id', bookId)
        .single();

      if (fetchError) throw fetchError;
      setLesson(data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
      setError('Error al cargar la lección.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-gray-600">Cargando...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-lg">
          <p>{error}</p>
          <Link href={`/books/${bookId}`}>
            <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
              Volver
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-xl font-semibold text-gray-600">
          Lección no encontrada
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-4">
        <Link href={`/books/${bookId}`}>
          <button className="text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Volver a Lecciones
          </button>
        </Link>
      </div>
      <LessonViewer lesson={lesson} />
    </>
  );
}
