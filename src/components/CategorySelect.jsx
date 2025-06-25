export default function CategorySelect({ value, onChange, categories }) {
  return (
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
      Kategori:
      <select
        name="category"
        value={value}
        onChange={onChange}
        className="w-full p-3 mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4 custom-select text-gray-900 dark:text-gray-100 transition-colors"
      >
        <option value="">Enhver kategori</option>
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </label>
  );
}
