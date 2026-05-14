import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../UI/ItemCard";

const ExploreItems = () => {

  const [items, setItems] = useState(new Array(16).fill(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getItems() {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
        setItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.slice(0,8).map((item, index) => (
        <ItemCard key={index} item={item} index={index} page="explore" />
      ))}
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead">
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
