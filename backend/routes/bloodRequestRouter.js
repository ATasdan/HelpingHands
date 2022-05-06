const express = require("express");
const router = express.Router();

const {
  createRequest,
  getNearbyRequests,
  pledgeToRequest,
  getPledges,
  deletePledge,
  getYourRequests,
} = require("../controllers/bloodRequestController");

router.route("/create").post(createRequest);
router.route("/nearbyRequests").post(getNearbyRequests);
router
  .route("/pledge")
  .post(pledgeToRequest)
  .get(getPledges)
  .delete(deletePledge);
router.route("/yourRequests").get(getYourRequests);
module.exports = router;
