import commentModel from "../models/commentModel.js";

// Save comment to MongoDB
export const createComment = async (req, res) => {
  try {
    console.log("REQ.PARAMS:", req.params);
    console.log("REQ.BODY:", req.body);

    const pinId = req.params.id;
    const { user, comment } = req.body;

    // Validate required fields
    if (!pinId || !comment || !user || !user.sub || !user.userName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log("Till here it works");

    const newComment = new commentModel({
      pinId,
      user,
      comment,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Server error while creating comment" });
  }
};

export const getCommentsByPinId = async (req, res) => {
  try {
    const pinId = req.params.id;

    console.log("Pin ID param:", pinId);

    const comments = await commentModel.find({ pinId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Server error while fetching comments" });
  }
};
