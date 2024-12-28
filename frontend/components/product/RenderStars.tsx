import { FaStar } from "react-icons/fa";

interface RenderStarsProps {
  rating: number;
  size: number;
  reviewsCount?: number;
}

const RenderStars: React.FC<RenderStarsProps> = ({ rating, size, reviewsCount }) => {
  return (
    <div className="flex flex-row items-center">
      {Array.from({ length: 5 }, (_, index) => {
        if (index < rating) {
          return (
            <span key={index} className="text-yellow-300 pr-1">
              <FaStar size={size} />
            </span>
          );
        }
        return (
          <span key={index} className="text-gray-300 pr-1">
            <FaStar size={size} />
          </span>
        );
      })}
      {reviewsCount && <span className="text-xs text-gray-300 pl-2">{reviewsCount}</span>}
    </div>
  );
};

export default RenderStars;
