const express = require('express');
const { requireAuth } = require('../../utils/auth');
const { ReviewImage, Review } = require('../../db/models');

const router = express.Router();

// Delete a Review Image
router.delete('/:imageId', requireAuth, async (req, res) => {
  const { imageId } = req.params;
  const userId = req.user.id; // Authenticated user's ID

  try {
    // 1. Find the ReviewImage by its ID
    const reviewImage = await ReviewImage.findByPk(imageId);

    // 2. If no review image exists, return 404 error
    if (!reviewImage) {
      return res.status(404).json({
        message: "Review Image couldn't be found"
      });
    }

    // 3. Find the Review associated with the image
    const review = await Review.findByPk(reviewImage.reviewId);

    // 4. Check if the authenticated user is the owner of the review
    if (review.userId !== userId) {
      return res.status(403).json({
        message: "Unauthorized: You do not own this review"
      });
    }

    // 5. Delete the review image
    await reviewImage.destroy();

    // 6. Send success response
    return res.status(200).json({
      message: "Successfully deleted"
    });
  } catch (error) {
    // Handle unexpected server errors
    return res.status(500).json({
      message: "Server Error",
      error: error.message
    });
  }
});

module.exports = router;
