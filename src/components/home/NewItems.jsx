import React, { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import NewItemsCarousel from "./NewItemsCarousel";
import axios from "axios";

const NewItems = () => {

  // By default, fill `newItems` with an array of falsy data
  // with more than 4 items. This sets up the carousel loading state.
  const [newItems, setNewItems] = useState(new Array(6).fill(0));

  // Only used to trigger re-render. See comment in HotCollections.jsx.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 50,
      once: true,
      easing: 'ease-in',
      duration: 500,
    });

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
        <div className="row" data-aos="fade">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <NewItemsCarousel items={newItems} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default NewItems;
