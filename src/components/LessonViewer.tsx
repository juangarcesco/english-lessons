'use client';

import Image from 'next/image';
import AudioPlayer from './AudioPlayer';
import { Lesson } from '@/types';

interface LessonViewerProps {
  lesson: Lesson;
}

export default function LessonViewer({ lesson }: LessonViewerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Leccion {lesson.lesson_number}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {lesson.title}
          </h1>
          <p className="text-xl text-gray-600">
            {lesson.description}
          </p>
        </div>

        {lesson.image_path && (
          <div className="mb-12 rounded-xl overflow-hidden shadow-2xl">
            <div className="relative w-full h-96">
              <Image
                src={lesson.image_path}
                alt={lesson.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {lesson.transcription && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Texto
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed font-semibold whitespace-pre-line">
              {lesson.transcription}
            </p>
          </div>
        )}

        {lesson.audio_path && (
          <div className="mb-12">
            <AudioPlayer
              audioUrl={lesson.audio_path}
              title={lesson.title}
            />
          </div>
        )}

        <div className="text-center">
          <a
            href="/books"
            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Volver a Libros
          </a>
        </div>
      </div>
    </div>
  );
}