const express = require("express");
const router = express.Router();

const {
  createRequest,
  getNearbyRequests,
  pledgeToRequest,
  getPledges,
  deletePledge,
  getYourRequests,
  cancelRequest,
} = require("../controllers/bloodRequestController");

router.route("/create").post(createRequest);
router.route("/nearbyRequests").post(getNearbyRequests);
router
  .route("/pledge")
  .post(pledgeToRequest)
  .get(getPledges)
  .delete(deletePledge);
router.route("/yourRequests").get(getYourRequests).delete(cancelRequest);
module.exports = router;
