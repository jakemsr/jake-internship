import React from 'react'
import { Link } from "react-router-dom";
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Skeleton from "../UI/Skeleton";
import CountdownTimer from './CountdownTimer';

const NewItemsCarousel = ({ items }) => {
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1, // 1 slide for mobile (0px and up)
      },
      600: {
        items: 2, // 2 slides for tablets (600px and up)
      },
      900: {
        items: 3, // 3 slides for desktops (900px and up)
      },
      1200: {
        items: 4, // never more than 4 items
      },
    },
  };
  return (
    <OwlCarousel {...options}>
      {items.map((item, index) => (
        <div key={index}>
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to={`/author/${item.authorId}`}
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                title="Creator: Monica Lucas"
              >
                {!item.authorImage ? (
                  <Skeleton width="50px" height="50px" borderRadius="50%" />
                ) : (
                  <img className="lazy" src={item.authorImage} alt="" />
                )}
                <i className="fa fa-check"></i>
              </Link>
            </div>
            {item.expiryDate && <CountdownTimer targetDate={item.expiryDate} />}

            {!item.nftImage ? (
              <Skeleton width="100%" height="350px" />
            ) : (
              <div className="nft__item_wrap">
                <div className="nft__item_extra">
                  <div className="nft__item_buttons">
                    <button>Buy Now</button>
                    <div className="nft__item_share">
                      <h4>Share</h4>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a href="" target="_blank" rel="noreferrer">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a href="">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>

                <Link to={`/item-details/${item.nftId}`}>
                  <img
                    src={item.nftImage}
                    className="lazy nft__item_preview"
                    alt=""
                  />
                </Link>
              </div>
            )}
            <div className="nft__item_info">
              {!item.title ? (
                <Skeleton width="180px" height="28px" />
              ) : (
                <Link to={`/item-details/${item.nftId}`}>
                  <h4>{item.title}</h4>
                </Link>
              )}
              <div className="nft__item_price">
                {!item.price ? (
                  <Skeleton width="90px" height="20px" />
                ) : (
                  <>
                    {item.price} ETH
                  </>
                )}
              </div>
              <div className="nft__item_like">
                {!item.likes ? (
                  <Skeleton width="30px" height="16px" />
                ) : (
                  <>
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
};

export default NewItemsCarousel;
