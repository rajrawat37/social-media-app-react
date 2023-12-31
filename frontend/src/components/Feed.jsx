import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

function Feed() {
  const [loading, setLoading] = useState(true);
  const [pins, setPins] = useState(null);

  const { categoryId } = useParams();
  console.log("🛠️ category Id is : 🛠️", categoryId)

  useEffect(() => {
    setLoading(true);
    
    console.log("✅ Reached ✅");
    console.log("First mount in categories Feed page!", categoryId);
    
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading)
    return <Spinner message="We are adding new ideas in your feed" />;

  return <div>
    <div>
      {pins && <MasonryLayout pins={pins}/>}
    </div>
  </div>;
}

export default Feed;
