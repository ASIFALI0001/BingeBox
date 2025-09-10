// components/GenreCard.jsx
export default function GenreCard({ genre, icon, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 sm:p-6 rounded-lg sm:rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 text-center ${
        isActive
          ? 'bg-indigo-600 shadow-xl scale-105'
          : 'bg-gray-800 hover:bg-gray-700 hover:shadow-lg'
      }`}
    >
      <div className="text-2xl sm:text-3xl mb-2">{icon}</div>
      <h4 className="font-semibold text-white text-sm sm:text-base">{genre}</h4>
    </div>
  );
}