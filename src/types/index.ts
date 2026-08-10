export interface Book {
  id: number;
  title: string;
  level: 'INITIAL' | 'INTERMEDIATE' | 'ADVANCED';
  description: string;
  created_at: string;
}

export interface Lesson {
  id: number;
  book_id: number;
  lesson_number: number;
  title: string;
  description: string;
  image_path: string | null;
  audio_path: string | null;
  transcription: string | null;
  created_at: string;
}

export interface LessonWithBook extends Lesson {
  book: Book;
}