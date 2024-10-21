import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createReview, fetchSpotReviews } from '../../store/spots';
import { FaStar } from 'react-icons/fa';
import './Reviews.css';
import { useParams } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal'; // Import ConfirmDeleteModal

const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;

    const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
    return (totalStars / reviews.length).toFixed(1); 
};

const Reviews = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
    const [selectedReviewId, setSelectedReviewId] = useState(null); // To store the ID of the review to delete

    const spot = useSelector(state => state.spots.currentUserSpots[id]);
    const user = useSelector(state => state.session.user);

    const fetchReviews = async () => {
        await dispatch(fetchSpotReviews(id));
    };

    useEffect(() => {
        fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, id]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();

        const reviewData = {
            review: reviewText,
            stars: rating,
        };

        const result = await dispatch(createReview(id, reviewData));

        if (result && result.errors) {
            setError(result.errors);
        } else {
            setRating(0);
            setReviewText('');
            setIsModalOpen(false);
            fetchReviews(); // Refresh reviews
        }
    };

    const handleDeleteReview = async (reviewId) => {
        await dispatch(deleteReview(reviewId));
        fetchReviews(); // Refresh reviews after delete
    };

    const openDeleteModal = (reviewId) => {
        setSelectedReviewId(reviewId); // Set the review ID to delete
        setIsDeleteModalOpen(true); // Open the delete confirmation modal
    };

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedReviewId(null); // Reset selected ID
    };

    const handleConfirmDelete = () => {
        if (selectedReviewId) {
            handleDeleteReview(selectedReviewId); // Delete the review
            closeDeleteModal(); // Close the modal after deletion
        }
    };

    const handleUpdateClick = (review) => {
        setSelectedReview(review);
        setIsModalOpen(true);
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

    const reviewsExist = spot && spot.numReviews > 0;
    const isOwner = spot && user && user.id === spot.Owner.id;
    const isButtonDisabled = reviewText.length < 10 || rating === 0;

    const hasUserReviewed = spot?.Reviews?.some(review => review.userId === user?.id) || false;

    const sortedReviews = spot?.Reviews ? spot.Reviews.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) : [];

    const averageRating = calculateAverageRating(spot?.Reviews);

    return (
        <div className="reviews-section">
            {reviewsExist ? (
                <>
                    <div className='reviews-header'>
                        <p className='reviews-count'>
                            <FaStar />
                            {averageRating ? ` ${averageRating}` : ' New'}
                            {spot.numReviews > 0 && ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'Review' : 'Reviews'}`}
                        </p>
                    </div>
                    {sortedReviews.length > 0 ? (
                        sortedReviews.map((review) => (
                            <div key={review.id} className="review">
                                <p className="reviewer-name">{review.User?.firstName}</p>
                                <p className="review-date">
                                    {new Date(review.createdAt).toLocaleString('default', { month: 'long' })} {new Date(review.createdAt).getFullYear()}
                                </p>
                                <p className="review-text">{review.review}</p>
                                {user && review.userId === user.id && (
                                    <div className="spot-actions manage-spot-buttons">
                                        <button onClick={() => handleUpdateClick(review)}>Update</button>
                                        <button onClick={() => openDeleteModal(review.id)}>Delete</button> {/* Open delete modal */}
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="no-reviews">No reviews available.</div>
                    )}
                </>
            ) : (
                <div className="no-reviews">
                    <h3><FaStar /> New</h3>
                </div>
            )}

            {user && !isOwner && !hasUserReviewed && (
                <>
                    {!reviewsExist && <p>Be the first to post a review!</p>}
                    <button onClick={() => setIsModalOpen(true)} className="post-review-button">Post Your Review</button>
                </>
            )}

            {isModalOpen && (
                <div id='modal'>
                    <div id="modal-background" onClick={() => setIsModalOpen(false)} />
                    <div id='modal-content'>
                        <div className="reviews-modal">
                            <h2>How was your stay?</h2>
                            {error && <p className="error">{error}</p>}
                            <form onSubmit={handleSubmitReview}>
                                <textarea
                                    placeholder="Write your review here..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                />
                                <div className='stars-wrapper'>{renderStars()} Stars</div>
                                <button
                                    type="submit"
                                    className={isButtonDisabled ? 'disabled-button' : 'enabled-button'}
                                    disabled={isButtonDisabled}
                                >
                                    Submit your review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && selectedReview && (
                <UpdateReviewModal
                    review={selectedReview}
                    onClose={() => setIsModalOpen(false)}
                    refreshReviews={fetchReviews}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    onClose={closeDeleteModal}
                    onConfirm={handleConfirmDelete}
                    modalValue="review"
                />
            )}
        </div>
    );
};

export default Reviews;
