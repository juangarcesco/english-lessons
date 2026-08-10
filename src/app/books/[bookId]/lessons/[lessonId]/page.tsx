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

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const { data, error } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .eq('book_id', bookId)
        .single();

      if (error) throw error;
      setLesson(data);
    } catch (error) {
      console.error('Error fetching lesson:', error);
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

  if (!lesson) {
    return (
      <div className="flex items-center justify-center min-h-screen">
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
          <button className="mb-4 text-indigo-600 hover:text-indigo-700 font-semibold">
            ← Volver a Lecciones
          </button>
        </Link>
      </div>
      <LessonViewer lesson={lesson} />
    </>
  );
}