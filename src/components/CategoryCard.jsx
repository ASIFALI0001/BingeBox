// components/CategoryCard.jsx
export default function CategoryCard({ title, icon, onClick, isActive }) {
  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
        isActive ? 'ring-4 ring-indigo-500 scale-105' : ''
      }`}
    >
      <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="text-center z-10">
          <div className="text-4xl mb-2">{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      </div>
    </div>
  );
}