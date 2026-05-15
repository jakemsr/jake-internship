import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Skeleton from "../UI/Skeleton";

const TopSellers = () => {

  // falsy array to set up loading state
  const [topSellers, setTopSellers] = useState(new Array(12).fill(0));
  // to trigger re-render
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      offset: 50,
      once: true,
      easing: 'ease-in',
      duration: 500,
    });

    async function getTopSellers() {
      try {
        const response = await axios.get("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");
        setTopSellers(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12" data-aos="fade">
            <ol className="author_list">
              {topSellers.map((item, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      {!item.authorImage ? (
                        <Skeleton width="50px" height="50px" borderRadius="50%" />
                      ) : (
                        <img
                          className="lazy pp-author"
                          src={item.authorImage}
                          alt=""
                        />
                      )}
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    {!item.authorName ? (
                      <Skeleton width="100px" height="20px" />
                    ) : (
                      <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    )}
                    <span>
                      {!item.price ? (
                        <Skeleton width="40px" height="20px" />
                      ) : (
                        <>
                          {item.price} ETH
                        </>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
