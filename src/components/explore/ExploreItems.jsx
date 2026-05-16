import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemCard from "../UI/ItemCard";

const ExploreItems = () => {

  // falsy array to set up loading state
  const [items, setItems] = useState(new Array(16).fill(0));
  // to trigger re-render
  const [loading, setLoading] = useState(true);

  const [numberToDisplay, setNumberToDisplay] = useState(8);

  async function getItems(filter) {
    try {
      const filterText = filter ? `?filter=${filter}` : "";
      const response = await axios.get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/explore${filterText}`);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" onChange={(e) => getItems(e.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.slice(0, numberToDisplay).map((item, index) => (
        <ItemCard key={index} item={item} index={index} page="explore" loading={loading} />
      ))}
      {numberToDisplay < items.length && (
      <div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={() => setNumberToDisplay(numberToDisplay + 4)}>
          Load more
        </Link>
      </div>
      )}
    </>
  );
};

export default ExploreItems;
