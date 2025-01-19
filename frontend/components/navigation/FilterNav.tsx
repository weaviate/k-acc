import { Filter } from "@/types/search";

interface FilterNavProps {
  filters: Filter[];
  onFilterChange: (filters: Filter[]) => void;
}

interface FilterItemProps {
  filter: Filter;
  onChange: (filter: Filter) => void;
}

const FilterItem: React.FC<FilterItemProps> = ({ filter, onChange }) => {
  switch (filter.type) {
    case "MULTI":
      return (
        <div className="mb-4">
          <h3 className="text-primary font-medium mb-2">{filter.name}</h3>
          <div className="flex flex-col gap-2">
            {filter.values?.map((value: string) => (
              <label key={value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={filter.values?.includes(value)}
                  onChange={(e) => {
                    const newValues = e.target.checked
                      ? [...(filter.values || []), value]
                      : filter.values?.filter((v: string) => v !== value) || [];
                    onChange({ ...filter, values: newValues });
                  }}
                  className="checkbox checkbox-primary"
                />
                <span className="text-sm">{value}</span>
              </label>
            ))}
          </div>
        </div>
      );

    case "SINGLE":
      return (
        <div className="mb-4">
          <h3 className="text-primary font-medium mb-2">{filter.name}</h3>
          <select
            value={filter.value || ""}
            onChange={(e) => onChange({ ...filter, value: e.target.value })}
            className="select select-bordered w-full"
          >
            <option value="">Select {filter.name}</option>
            {filter.values?.map((value: string) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      );

    case "RANGE":
      return (
        <div className="mb-4">
          <h3 className="text-primary font-medium mb-2">{filter.name}</h3>
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min"
              value={filter.min || ""}
              onChange={(e) => 
                onChange({ ...filter, min: Number(e.target.value) })
              }
              className="input input-bordered w-full"
            />
            <input
              type="number"
              placeholder="Max"
              value={filter.max || ""}
              onChange={(e) => 
                onChange({ ...filter, max: Number(e.target.value) })
              }
              className="input input-bordered w-full"
            />
          </div>
        </div>
      );

    default:
      return null;
  }
};

const FilterNav: React.FC<FilterNavProps> = ({ filters, onFilterChange }) => {
  const handleFilterChange = (updatedFilter: Filter) => {
    const newFilters = filters.map((filter) =>
      filter.name === updatedFilter.name ? updatedFilter : filter
    );
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-secondary p-4 rounded-lg">
      <h2 className="text-lg font-medium text-primary mb-4">Filters</h2>
      {filters.map((filter: Filter) => (
        <FilterItem
          key={filter.name}
          filter={filter}
          onChange={handleFilterChange}
        />
      ))}
    </div>
  );
};

export default FilterNav;