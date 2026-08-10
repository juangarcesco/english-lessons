'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import LessonViewer from '@/components/LessonViewer';
import { Lesson } from '@/types';

export default function LessonPage() {
  const params = useParams();
  const bookId = params.bookId;
  const lessonId = params.lessonId;
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLesson();
  }, [lessonId, bookId]);

  const fetchLesson = async () => {
    try {
      const { data } = await supabase
        .from('lessons')
        .select('*')
        .eq('id', lessonId)
        .eq('book_id', bookId)
        .single();

      setLesson(data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!lesson) {
    return <div className="flex items-center justify-center min-h-screen">Lesson not found</div>;
  }

  return (
    <>
      <div className="p-4">
        <Link href={`/books/${bookId}`}>
          <button className="text-indigo-600 font-semibold">
            Back to Lessons
          </button>
        </Link>
      </div>
      <LessonViewer lesson={lesson} />
    </>
  );
}
