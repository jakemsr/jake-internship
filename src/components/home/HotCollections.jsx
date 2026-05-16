import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import HotCollectionsCarousel from "./HotCollectionsCarousel";

const HotCollections = () => {

  // By default, fill `collection` with an array of falsy data
  // with more than 4 items. This sets up the carousel loading state.
  const [collection, setCollection] = useState(new Array(6).fill(0));

  // The value of `loading` is not actually used. Without this and
  // the setLoading(false) call in getCollection(), the carousel
  // never leaves loading state. Console logging shows
  // HotCollectionsCarousel() does run again after the axios
  // response with `items` prop filled with correct data, but the
  // carousel never re-renders.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 50,
      once: true,
      easing: 'ease-in',
      duration: 500,
    });

    async function getCollection() {
      try {
        const response = await axios.get('https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections');
        setCollection(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getCollection();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row" data-aos="fade">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <HotCollectionsCarousel items={collection} loading={loading} />
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
