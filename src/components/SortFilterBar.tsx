import React from "react";

type SortOption = "none" | "price-asc" | "price-desc";

interface SortFilterBarProps {
  sortOption: SortOption;
  onSortOptionChange: (value: SortOption) => void;
  minYear: number | "";
  maxYear: number | "";
  onMinYearChange: (value: number | "") => void;
  onMaxYearChange: (value: number | "") => void;
}

export const SortFilterBar: React.FC<SortFilterBarProps> = ({
  sortOption,
  onSortOptionChange,
  minYear,
  maxYear,
  onMinYearChange,
  onMaxYearChange,
}) => {
  return (
    <div className="sort-filter-bar">
      <div className="sort-group">
        <label htmlFor="sort-select">Sort by price:</label>
        <select
          id="sort-select"
          value={sortOption}
          onChange={(e) =>
            onSortOptionChange(e.target.value as SortOption)
          }
        >
          <option value="none">None</option>
          <option value="price-asc">Low → High</option>
          <option value="price-desc">High → Low</option>
        </select>
      </div>

      <div className="year-group">
        <label>Publish year:</label>
        <input
          type="number"
          placeholder="Min"
          value={minYear}
          onChange={(e) =>
            onMinYearChange(e.target.value ? Number(e.target.value) : "")
          }
        />
        <span>–</span>
        <input
          type="number"
          placeholder="Max"
          value={maxYear}
          onChange={(e) =>
            onMaxYearChange(e.target.value ? Number(e.target.value) : "")
          }
        />
      </div>
    </div>
  );
};
