import { csrfFetch } from './csrf';

const LOAD_REVIEWS = "reviews/loadReviews";
const DELETE_REVIEW = "reviews/deleteReview";
const UPDATE_REVIEW = "reviews/updateReview";

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
});

const updateReviewAction = (review) => ({
    type: UPDATE_REVIEW,
    review,
});


const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

export const fetchCurrentUserReviews = () => async (dispatch) => {
    const response = await csrfFetch('/api/reviews/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadReviews(data.Reviews));
    } else {
        console.error('Error fetching reviews');
    }
};

export const updateReview = (review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(review), 
    });

    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(updateReviewAction(updatedReview)); 
    } else {
        console.error('Error updating review');
    }
};

export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(deleteReviewAction(reviewId));
    } else {
        console.error('Error deleting review');
    }
};

const initialState = {
    currentUserReviews: {}
};

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {
            const newState = { ...state, currentUserReviews: {} };
            action.reviews.forEach((review) => {
                newState.currentUserReviews[review.id] = review;
            });
            return newState;
        }
        case DELETE_REVIEW: {
            const newState = { ...state.currentUserReviews };
            delete newState[action.reviewId];
            return { currentUserReviews: newState };
        }
        case UPDATE_REVIEW: {
            const newState = { ...state.currentUserReviews };
            newState[action.review.id] = action.review; 
            return { currentUserReviews: newState };
        }
        default:
            return state;
    }
};


export default reviewsReducer;
