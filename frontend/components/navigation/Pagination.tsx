
interface PaginationProps {
    page: number;
    onPageChange: (page: number) => void;

}

export default function Pagination({ page, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-center items-center">
            <button className="btn btn-primary" onClick={() => onPageChange(page - 1)}>Previous</button>
            <button className="btn btn-primary" onClick={() => onPageChange(page + 1)}>Next</button>
        </div>
    )
}