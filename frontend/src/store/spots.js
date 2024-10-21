import { csrfFetch } from './csrf';

const LOAD_SPOT = "spots/loadSpot";
const LOAD_SPOTS = "spots/loadSpots";
const LOAD_ALL_SPOTS = "spots/loadAllSpots";
const CREATE_SPOT = "spots/createSpot";
const CREATE_REVIEW = "spots/createReview";
const UPDATE_SPOT = "spots/updateSpot";
const DELETE_SPOT = "spots/deleteSpot";
const UPDATE_SPOT_IMAGES = "spots/updateSpotImages";


const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

const loadSpot = (spot) => ({
    type: LOAD_SPOT,
    spot
});

const loadAllSpots = (spots) => ({
    type: LOAD_ALL_SPOTS,
    spots
});

const createSpot = (spot) => ({
    type: CREATE_SPOT,
    spot
});

const createReviewAction = (review) => ({
    type: CREATE_REVIEW,
    review
});

const updateSpotImages = (spotId, images) => ({
    type: UPDATE_SPOT_IMAGES,
    spotId,
    images,
});


const deleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});

export const fetchSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data.Spots));
    } else {
        console.error('Error fetching spots');
    }
};

export const fetchAllSpots = () => async (dispatch) => {
    try {
        const response = await csrfFetch('/api/spots');
        if (response.ok) {
            const data = await response.json();
            dispatch(loadAllSpots(data.Spots));
        } else {
            console.error('Error fetching all spots');
        }
    } catch (err) {
        console.error('Error:', err);
    }
};

export const fetchSpotById = (id) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${id}`);
        if (!response.ok) throw response;
        const spot = await response.json();
        dispatch(loadSpot(spot));
    } catch (err) {
        console.error('Error fetching spot details:', err);
        const errorData = await err.json();
        return errorData.errors || ['Error fetching spot details'];
    }
};

export const createNewSpot = (spotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(spotData)
    });

    if (response.ok) {
        const newSpot = await response.json();
        dispatch(createSpot(newSpot));
        return newSpot;
    } else {
        const errorData = await response.json();
        return errorData.errors;
    }
};

export const createReview = (spotId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReviewAction(newReview));
        return newReview;
    } else {
        const errorData = await response.json();
        return { errors: errorData.message };
    }
};

export const fetchSpotReviews = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const data = await response.json();
        console.log(data, "Fetched spot reviews");

       
        dispatch(loadSpot({
            id: spotId, 
            Reviews: data.Reviews, 
            numReviews: data.Reviews.length 
        }));
    } else {
        console.error('Error fetching spot reviews');
    }
};

// eslint-disable-next-line no-unused-vars
export const createSpotImage = (imageData) => async (dispatch) => {
    const { spotId, url, preview } = imageData;

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        body: JSON.stringify({ url, preview }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.ok) {
        const image = await response.json();
        return image;
    } else {
        const errors = await response.json();
        throw errors;
    }
};

export const deleteSpotById = (spotId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(deleteSpot(spotId)); 
            return true;
        } else {
            const errorData = await response.json();
            return errorData.message;
        }
    } catch (err) {
        console.error('Error deleting spot:', err);
    }
};

export const updateSpotById = (spotId, spotData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(spotData),
        });

        if (!response.ok) throw response;

        const updatedSpot = await response.json();
        dispatch(loadSpot(updatedSpot)); 
        return updatedSpot;
    } catch (err) {
        console.error('Error updating spot:', err);
        const errorData = await err.json();
        return errorData.errors || ['Error updating spot'];
    }
};

export const updateSpotImagesById = (spotId, images) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ images }),
    });

    if (response.ok) {
        const updatedImages = await response.json();
        dispatch(updateSpotImages(spotId, updatedImages.images)); 
        return updatedImages; 
    } else {
        const errorData = await response.json();
        return { errors: errorData.message };
    }
};


const initialState = {
    currentUserSpots: {},
    allSpots: {}
};

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_SPOTS: {
            const newState = { ...state, currentUserSpots: {} };
            action.spots.forEach(spot => {
                newState.currentUserSpots[spot.id] = spot;
            });
            return newState;
        }
        case LOAD_ALL_SPOTS: {
            const newState = { ...state, allSpots: {} };
            action.spots.forEach(spot => {
                newState.allSpots[spot.id] = spot;
            });
            return newState;
        }
        case LOAD_SPOT: {
            const newState = { ...state.currentUserSpots };
            const spotWithReviews = action.spot;

            newState[spotWithReviews.id] = {
                ...newState[spotWithReviews.id],
                ...spotWithReviews,
            };
            return { ...state, currentUserSpots: newState };
        }
        case CREATE_SPOT: {
            const newState = { ...state.currentUserSpots };
            newState[action.spot.id] = action.spot;
            return { ...state, currentUserSpots: newState };
        }
        case CREATE_REVIEW: {
            const newState = { ...state.currentUserSpots };
            const spotId = action.review.spotId;
            if (newState[spotId]) {
                newState[spotId].Reviews = [
                    ...(newState[spotId].Reviews || []),
                    action.review
                ];
                newState[spotId].numReviews = (newState[spotId].numReviews || 0) + 1;
            }
            return { ...state, currentUserSpots: newState };
        }
        case UPDATE_SPOT: {
            const newState = { ...state.currentUserSpots };
            newState[action.spot.id] = action.spot;
            return { ...state, currentUserSpots: newState };
        }
        case DELETE_SPOT: {
            const newState = { ...state.currentUserSpots };
            delete newState[action.spotId];
            return { ...state, currentUserSpots: newState };
        }
        case UPDATE_SPOT_IMAGES: {
            const { spotId, images } = action;
            const updatedSpot = {
                ...state[spotId],
                SpotImages: images,
            };
            return {
                ...state,
                [spotId]: updatedSpot,
            };
        }
        default:
            return state;
    }
};

export default spotsReducer;
