import SavedPin from "../models/pinModel.js";

export const getSavedPinsByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const userData = await SavedPin.findOne({ userId });

    if (!userData) {
      return res.status(404).json({ message: "No saved pins found" });
    }

    res.status(200).json({ savedPins: userData.savedPins });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const savePinsByUserId = async (req, res) => {
  console.log("✅ savePinsByUserId API is working");

  const { userId } = req.params;
  const { pinId } = req.body;

  console.log("🧩 UserId & pinId:", userId, "&", pinId);

  try {
    let userData = await SavedPin.findOne({ userId });
    // console.log("🔍 Existing User Data:", userData);

    if (!userData) {
      userData = new SavedPin({ userId, savedPins: [pinId] });
    } else {
      // Check if already saved
      if (userData.savedPins.includes(pinId)) {
        return res.status(409).json({ message: "Pin already saved" });
      }
      userData.savedPins.push(pinId); // Add new pin
    }

    await userData.save();

    res.status(201).json({
      message: "✅ Pin saved successfully",
      data: userData,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
