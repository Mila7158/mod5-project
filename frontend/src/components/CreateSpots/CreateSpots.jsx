import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewSpot, createSpotImage } from "../../store/spots";
import './CreateSpots.css';
import { useNavigate } from "react-router-dom";

function CreateSpots() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        country: "",
        address: "",
        city: "",
        state: "",
        latitude: "",
        longitude: "",
        description: "",
        title: "",
        price: "",
        previewImageUrl: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
    });

    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = [];

        
        if (!formData.country) newErrors.push("Country is required");
        if (!formData.address) newErrors.push("Street address is required");
        if (!formData.city) newErrors.push("City is required");
        if (!formData.state) newErrors.push("State is required");

        
        if (formData.description.length < 30) {
            newErrors.push("Description needs a minimum of 30 characters");
        }
        
        if (!formData.title) newErrors.push("Name is required");
        if (!formData.price || formData.price <= 0) newErrors.push("Price is required");

        
        const latitude = parseFloat(formData.latitude);
        const longitude = parseFloat(formData.longitude);

        if (!formData.latitude || isNaN(latitude) || latitude < -90 || latitude > 90) {
            newErrors.push("Latitude is required and must be a number between -90 and 90");
        }

        if (!formData.longitude || isNaN(longitude) || longitude < -180 || longitude > 180) {
            newErrors.push("Longitude is required and must be a number between -180 and 180");
        }

        
        const validImageRegex = /\.(png|jpg|jpeg)$/i;
        if (!formData.previewImageUrl || !validImageRegex.test(formData.previewImageUrl)) {
            newErrors.push("Preview image is required and must end in .png, .jpg, or .jpeg");
        }

        
        if (newErrors.length > 0) {
            setErrors(newErrors);
            return;
        }

        const spotData = {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            country: formData.country,
            lat: latitude,
            lng: longitude,
            name: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
        };

        try {
            const spot = await dispatch(createNewSpot(spotData));

            
            const imageData = [
                { url: formData.previewImageUrl, preview: true },
                { url: formData.image1, preview: false },
                { url: formData.image2, preview: false },
                { url: formData.image3, preview: false },
                { url: formData.image4, preview: false },
            ];

            for (const img of imageData) {
                if (img.url && validImageRegex.test(img.url)) {
                    await dispatch(createSpotImage({ spotId: spot.id, ...img }));
                }
            }

            navigate("/")

            console.log("Spot and images created successfully");
        } catch (err) {
            console.error("Error creating spot or images:", err);
            setErrors(err.errors || [err.message]);
        }
    };

    return (
        <div className="create-spot-container">
            <h1>Create a new Spot</h1>
            <form onSubmit={handleSubmit} className="create-spot-form">
                <div className="section">
                    <h2>Where&apos;s your place located?</h2>
                    <p>Guests will only get your exact address once they book a reservation.</p>
                    <div className="label-wrapper">
                        <label>Country</label>
                        {errors.includes("Country is required") && <p className="error">Country is required</p>}
                    </div>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"

                    />

                    <div className="label-wrapper">
                        <label>Street Address</label>
                        {errors.includes("Street address is required") && <p className="error">Street address is required</p>}
                    </div>

                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                    />

                    <div className="city-state">
                        <div>
                            <div className="label-wrapper">
                                <label>City</label>
                                {errors.includes("City is required") && <p className="error">City is required</p>}
                            </div>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                placeholder="City"
                            />
                        </div>

                        <div>
                            <div className="label-wrapper">
                                <label>State</label>
                                {errors.includes("State is required") && <p className="error">State is required</p>}
                            </div>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                                placeholder="State"
                            />
                        </div>
                    </div>
                </div>

                <div className="latitude-longitude">
                    <div>
                        <label>Latitude</label>
                        <input
                            type="text"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleChange}
                            placeholder="Latitude"
                        />
                        {errors.includes("Latitude is required and must be a number between -90 and 90") && (
                            <p className="error">Latitude is required and must be a number between -90 and 90</p>
                        )}
                    </div>

                    <div>
                        <label>Longitude</label>
                        <input
                            type="text"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleChange}
                            placeholder="Longitude"
                        />
                        {errors.includes("Longitude is required and must be a number between -180 and 180") && (
                            <p className="error">Longitude is required and must be a number between -180 and 180</p>
                        )}
                    </div>
                </div>

                <div className="section">
                    <h2>Describe your place to guests</h2>
                    <p>Mention the best features of your space, any special amentities like
                    fast wif or parking, and what you love about the neighborhood.</p>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Please write at least 30 characters"
                    ></textarea>
                    {errors.includes("Description needs a minimum of 30 characters") && <p className="error">Description needs a minimum of 30 characters</p>}
                </div>

                <div className="section">
                    <h2>Create a title for your spot</h2>
                    <p>Catch guests&apos; attention with a spot title that highlights what makes
                    your place special.</p>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Name of your spot"
                    />
                    {errors.includes("Name is required") && <p className="error">Name is required</p>}
                </div>

                <div className="section">
                    <h2>Set a base price for your spot</h2>
                    <p>Competitive pricing can help your listing stand out and rank higher
                    in search results</p>
                    <div className="price-wrapper">
                        <span>$</span>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price per night (USD)"
                        />
                    </div>
                    {errors.includes("Price is required") && <p className="error">Price is required</p>}
                </div>

                <div className="section">
                    <h2>Liven up your spot with photos</h2>
                    <p>Submit a link to at least one photo to publish your spot.</p>
                    <input
                        type="text"
                        name="previewImageUrl"
                        value={formData.previewImageUrl}
                        onChange={handleChange}
                        placeholder="Preview Image URL"
                    />
                    {errors.includes("Preview image is required and must end in .png, .jpg, or .jpeg") && <p className="error">Preview image is required and must end in .png, .jpg, or .jpeg</p>}

                    <input
                        type="text"
                        name="image1"
                        value={formData.image1}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <input
                        type="text"
                        name="image2"
                        value={formData.image2}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <input
                        type="text"
                        name="image3"
                        value={formData.image3}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                    <input
                        type="text"
                        name="image4"
                        value={formData.image4}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                </div>

                <button type="submit" className="create-spot-button">Create Spot</button>
            </form>
        </div>
    );
}

export default CreateSpots;
