import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import NewItemsCarousel from "./NewItemsCarousel";
import axios from "axios";

const NewItems = () => {

  // By default, fill `newItems` with an array of falsy data
  // with more than 4 items. This sets up the carousel loading state.
  const [newItems, setNewItems] = useState(new Array(6).fill(0));

  // Only used to trigger re-render. See comment in HotCollections.jsx.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getNewItems() {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems");
        setNewItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getNewItems();
  }, [])

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <NewItemsCarousel items={newItems} />
        </div>
      </div>
    </section>
  );
};

export default NewItems;
