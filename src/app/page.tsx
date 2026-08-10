import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center px-4">
      <div className="text-center text-white">
        <h1 className="text-6xl font-bold mb-6">
          🌍 English Lessons
        </h1>
        <p className="text-2xl mb-12 text-gray-100">
          Aprende inglés de manera divertida e interactiva
        </p>
        <Link href="/books">
          <button className="bg-white text-purple-600 font-bold py-4 px-12 rounded-lg text-2xl hover:bg-gray-100 transition transform hover:scale-105">
            Comenzar Ahora →
          </button>
        </Link>
      </div>
    </div>
  );
}