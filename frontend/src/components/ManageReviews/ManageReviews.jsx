import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentUserReviews, deleteReview } from '../../store/reviews';
import './ManageReviews.css'; 
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal';

const ManageReviews = () => {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.reviews.currentUserReviews));
    const [selectedReview, setSelectedReview] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 

    useEffect(() => {
        dispatch(fetchCurrentUserReviews());
    }, [dispatch]);

    const handleDelete = (reviewId) => {
        dispatch(deleteReview(reviewId));
    };

    const handleUpdateClick = (review) => {
        setSelectedReview(review); 
        setIsModalOpen(true); 
    };

    const refreshReviews = () => {
        dispatch(fetchCurrentUserReviews()); 
    };

    return (
        <div className="manage-reviews">
            <h2>Manage Your Reviews</h2>
            <div className="reviews-container">
                {reviews.length > 0 ? (
                    reviews.map((review) => (
                        <div key={review.id} className="review-tile">
                            <h3>{review.Spot?.name}</h3>
                            <p className="review-date">
                                {new Date(review.createdAt).toLocaleString('default', { month: 'long' })} {new Date(review.createdAt).getFullYear()}
                            </p>
                            <p>{review.review}</p>
                            <div className="spot-actions manage-spot-buttons">
                                <button onClick={() => handleUpdateClick(review)}>Update</button>
                                <button onClick={() => handleDelete(review.id)}>Delete</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No reviews found.</p>
                )}
            </div>
            {isModalOpen && selectedReview && (
                <UpdateReviewModal 
                    review={selectedReview} 
                    onClose={() => setIsModalOpen(false)} 
                    refreshReviews={refreshReviews} 
                />
            )}
        </div>
    );
};

export default ManageReviews;