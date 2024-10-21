import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots, deleteSpotById } from '../../store/spots';
import { NavLink, useNavigate } from 'react-router-dom';
import './Spots.css';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { FaStar } from 'react-icons/fa'; 

const Spots = () => {
    const dispatch = useDispatch();
    const spots = useSelector((state) => Object.values(state.spots.currentUserSpots));
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSpotId, setSelectedSpotId] = useState(null);
    
    const [tooltip, setTooltip] = useState({
        visible: false,
        title: "",
        x: 0,
        y: 0,
    });

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    const handleDelete = async () => {
        if (selectedSpotId) {
            await dispatch(deleteSpotById(selectedSpotId));
            setIsModalOpen(false);
        }
    };

    const openDeleteModal = (spotId) => {
        setSelectedSpotId(spotId);
        setIsModalOpen(true);
    };

    const closeDeleteModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = (spotId) => {
        navigate(`/spots/${spotId}/edit`);
    };

    // Tooltip handlers
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
        <div className='manage-spots'>
            <h2>Manage Spots</h2>
            <NavLink to="/spots/new" className="create-spot-button">Create new spot</NavLink>

            <div className="spots-container">
                {spots.map((spot) => (
                    <div key={spot.id} className="spot-tile">
                        <NavLink to={`/spots/${spot.id}`}>
                            <img
                                src={spot.previewImage || '/default-image.jpg'}
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
                                        {Array.from({ length: 5 }, (v, i) => (
                                            <FaStar key={i} className={i < Math.round(spot.avgRating) ? 'filled-star' : 'empty-star'} />
                                        ))}
                                    </span>
                                </div>
                                <div className="spot-price">${spot.price} night</div>
                            </div>
                        </NavLink>
                        <div className="spot-actions manage-spot-buttons">
                            <button onClick={() => handleUpdate(spot.id)}>Update</button>
                            <button onClick={() => openDeleteModal(spot.id)}>Delete</button>
                        </div>
                    </div>
                ))}

                {isModalOpen && (
                    <ConfirmDeleteModal
                        onClose={closeDeleteModal}
                        onConfirm={handleDelete}
                        modalValue="spot"
                    />
                )}
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

export default Spots;
