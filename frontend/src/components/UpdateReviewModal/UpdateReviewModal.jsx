import { useDispatch } from 'react-redux';
import { updateReview } from '../../store/reviews';
import { FaStar } from 'react-icons/fa';
import './UpdateReviewModal.css';
import { useState } from 'react';

const UpdateReviewModal = ({ review, onClose, refreshReviews }) => {
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState(review.review);
    const [rating, setRating] = useState(review.stars);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewData = {
            review: reviewText,
            stars: rating,
        };


        const result = await dispatch(updateReview({ id: review.id, ...reviewData }));

        if (result && result.errors) {
            setError(result.errors);
        } else {
            refreshReviews(); 
            onClose();
        }
    };

    const renderStars = () => {
        return (
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                        key={star}
                        className={`star ${star <= (hoveredRating || rating) ? 'filled' : ''}`}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        onClick={() => setRating(star)}
                    />
                ))}
            </div>
        );
    };

    return (
        <div id="modal">
            <div id="modal-background" onClick={onClose} />
            <div id="modal-content">
                <div className="reviews-modal">
                    <h2>Update Your Review</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <textarea
                            placeholder="Update your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        />
                        <div className='stars-wrapper'>{renderStars()} Stars</div>
                        <button
                            type="submit"
                            className={reviewText.length < 10 || rating === 0 ? 'disabled-button' : 'enabled-button'}
                            disabled={reviewText.length < 10 || rating === 0}
                        >
                            Submit Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateReviewModal;
