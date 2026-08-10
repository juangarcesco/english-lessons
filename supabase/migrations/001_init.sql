-- Create books table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  level VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create lessons table
CREATE TABLE lessons (
  id SERIAL PRIMARY KEY,
  book_id INT NOT NULL REFERENCES books(id) ON DELETE CASCADE,
  lesson_number INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_path VARCHAR(500),
  audio_path VARCHAR(500),
  transcription TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO books (title, level, description) 
VALUES ('English for Everyone - Level 1', 'INITIAL', 'Beginner English Course');

INSERT INTO lessons (book_id, lesson_number, title, description, transcription)
VALUES (1, 1, 'Presentarse', 'Learn how to introduce yourself in English', 'Hello, my name is...');
