
interface FilterProps {
    onFilter: (filter: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
    return (
        <div>
            <button onClick={() => onFilter("price")}>Price</button>
            <button onClick={() => onFilter("rating")}>Rating</button>
        </div>
    );
};

export default Filter;