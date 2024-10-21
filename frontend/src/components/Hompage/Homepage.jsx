import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { fetchAllSpots } from "../../store/spots";
import './Homepage.css';
import { NavLink } from "react-router-dom";

const Homepage = () => {
    const dispatch = useDispatch();
    const spots = useSelector(state => Object.values(state.spots.allSpots));

    const [tooltip, setTooltip] = useState({
        visible: false,
        title: "",
        x: 0,
        y: 0,
    });

    useEffect(() => {
        dispatch(fetchAllSpots());
    }, [dispatch]);

    const handleMouseEnter = (e, title) => {
        setTooltip({
            visible: true,
            title,
            x: e.pageX,
            y: e.pageY,
        });
    };

    const handleMouseMove = (e) => {
        setTooltip(prevTooltip => ({
            ...prevTooltip,
            x: e.pageX,
            y: e.pageY,
        }));
    };

    const handleMouseLeave = () => {
        setTooltip({
            visible: false,
            title: "",
            x: 0,
            y: 0,
        });
    };

    return (
        <div className="homepage">
            <div className="spots-container">
                {spots.map((spot) => (
                    <div key={spot.id} className="spot-tile">
                        <NavLink to={`/spots/${spot.id}`}>
                            <img
                                src={spot.previewImage}
                                alt={spot.name}
                                className="spot-image"
                                onMouseEnter={(e) => handleMouseEnter(e, spot.name)}
                                onMouseMove={handleMouseMove}
                                onMouseLeave={handleMouseLeave}
                            />
                            <div className="spot-details">
                                <div className="spot-details-wrapper">
                                    <h3>
                                        {spot.city}, {spot.state}
                                    </h3>
                                    <span className="spot-rating">
                                        <FaStar className='filled-star' />
                                        <span className="avg-rating">
                                            {spot.avgRating ? spot.avgRating : "New"}
                                        </span>
                                    </span>
                                </div>
                                <div className="spot-price">${spot.price} night</div>
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>

            {tooltip.visible && (
                <div
                    className="tooltip"
                    style={{
                        top: `${tooltip.y + 35}px`,
                        left: `${tooltip.x + 15}px`,
                    }}
                >
                    {tooltip.title}
                </div>
            )}
        </div>
    );
};

export default Homepage;
