const categories = [
  'All',
  'AI',
  'Programming',
  'Startups',
  'Cybersecurity',
  'Cloud',
  'Mobile',
  'Web Dev',
]

function CategoryFilter({ selectedCategory, onSelectCategory, theme }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`rounded-full border px-4 py-2 text-sm ${
            selectedCategory === category
              ? 'bg-blue-600 border-blue-600 text-white'
              : theme === 'dark'
              ? 'border-slate-700 hover:bg-slate-800'
              : 'border-slate-300 hover:bg-slate-100'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter