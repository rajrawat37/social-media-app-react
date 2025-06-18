import fetch from "node-fetch";

export const fetchMultipleImages = async (req, res) => {
  const UNSPLASH_ACCESS_KEY = `${process.env.UNSPLASH_ACCESS_KEY}`;
  try {
    let allImages = [];
    const totalPages = 7;

    console.log("🔑 Unsplash Key used:", UNSPLASH_ACCESS_KEY);
    console.log("📄 Headers:", {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    });

    for (let page = 1; page <= totalPages; page++) {
      const response = await fetch(
        `https://api.unsplash.com/photos?page=${page}&per_page=50`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Unsplash API error: ${response.statusText}`);
      }

      const data = await response.json();
      allImages = [...allImages, ...data];
    }

    res.status(200).json(allImages);
  } catch (error) {
    console.error("🚫 Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images from unsplash" });
  }
};

export const fetchSearchImages = async (req, res) => {
  const UNSPLASH_ACCESS_KEY = `${process.env.UNSPLASH_ACCESS_KEY}`;
  try {
    const { searchTerm } = req.query;
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        searchTerm
      )}&per_page=30`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.status(200).json(data.results);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed due to fetch images from unsplash" });
  }
};
