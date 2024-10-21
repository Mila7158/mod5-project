import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSpotById } from '../../store/spots';
import './SpotDetails.css';
import Reviews from '../Reviews/Reviews';
import { FaStar } from 'react-icons/fa';

const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return null;

    const totalStars = reviews.reduce((total, review) => total + review.stars, 0);
    return (totalStars / reviews.length).toFixed(1); 
};


function SpotDetails() {
    const { id } = useParams();  
    const dispatch = useDispatch();
    
    const spot = useSelector((state) => state?.spots?.currentUserSpots[id]);
    console.log(spot)
    
    useEffect(() => {
        dispatch(fetchSpotById(id));
    }, [dispatch, id]);

    const handleReserve = () => {
        alert("Feature coming soon");
    }

    if (!spot) return <p>Loading...</p>;

    const averageRating = calculateAverageRating(spot?.Reviews);


    return (
        <div className="spot-details-container">
            <h1 className="spot-title">{spot.name}</h1>
            <h2 className="spot-location">{`${spot.city}, ${spot.state}, ${spot.country}`}</h2>
            <div className="image-gallery">
                {spot.SpotImages?.length > 0 && (
                    <>
                        <div className="image-first">
                            <img src={`${spot.SpotImages[0]?.url}`} alt="Spot" className="spot-image" />
                        </div>

                        <div className={`image-grid ${spot.SpotImages?.length > 1 ? 'multiple' : ''}`}>
                            {spot.SpotImages.slice(1).map((image, index) => (
                                <img key={image.id} src={image.url} alt={`Spot Image ${index + 2}`} className="spot-image small-image" />
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="spot-info">
                <div className='spot-info-wrapper'>
                <p className="host-info">Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</p>
                    <p className="spot-description">{spot.description}</p>
                </div>
                <div className="reserve-box">
                    <div className="price-reserve">
                        <span className="spot-price">${spot.price} night</span>
                        {spot.numReviews > 0 ? (
                            <p className='reviews-count'>
                            <FaStar />
                            {averageRating ? ` ${averageRating}` : ' New'}
                            {spot.numReviews > 0 && ` · ${spot.numReviews} ${spot.numReviews === 1 ? 'Review' : 'Reviews'}`}
                        </p>
                        ) : (
                            <p className="no-reviews"><FaStar/> New</p>
                        )}
                    </div>
                    <button className="reserve-button" onClick={handleReserve}>Reserve</button>
                </div>
            </div>
            <Reviews />
        </div>

    );
}

export default SpotDetails;
