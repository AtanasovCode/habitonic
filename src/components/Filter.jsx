import '../styles/filter.css';
import '../styles/tasks-page.css';

//using this as a reusable component instead of writing out the return code multiple times
//this component can be reused everywhere as long as it is imported and the needed props are passed to it
const Filter = ({
    filter,
    handleFilterChange,
    FilterIcon,
    filterName,
}) => {
    return (
        <div
            className="filter"
            id={filter === filterName ? "active" : "inactive"}
            onClick={() => handleFilterChange(filterName)}
        >
            <div className="filter-icon">
                <FilterIcon
                    color={filter === filterName ? "#fff" : "#ccc"}
                    weight="light"
                    size={32}
                />
            </div>
            <div className="filter-name">
                {filterName}
            </div>
        </div>
    );
}

export default Filter;