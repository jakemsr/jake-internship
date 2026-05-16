import React from 'react'
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";
import CountdownTimer from './CountdownTimer';

const ItemCard = ({ item, index, page, loading }) => {
  let myClass = "";
  let myStyle = {};
  if (page === "explore") {
    myClass = "d-item col-lg-3 col-md-6 col-sm-6 col-xs-12";
    myStyle = { display: "block", backgroundSize: "cover" };
  } else if (page === "author") {
    myClass = "col-lg-3 col-md-6 col-sm-6 col-xs-12";
  }
  return (
    <div key={index} className={`${myClass}`} style={myStyle}>
      <div className="nft__item">
        <div className="author_list_pp">
          <Link to={`/author/${item ? item.authorId : ""}`}>
            {!item ? (
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            ) : (
              <img className="lazy" src={item.authorImage} alt="" />
            )}
            <i className="fa fa-check"></i>
          </Link>
        </div>
        {page !== "author" && item.expiryDate && <CountdownTimer targetDate={item.expiryDate} />}

        {!item ? (
          <Skeleton width="100%" height="350px" />
        ) : (
          <div className="nft__item_wrap">
            <div className="nft__item_extra">
              <div className="nft__item_buttons">
                <button>Buy Now</button>
                <div className="nft__item_share">
                  <h4>Share</h4>
                  {/* these empty hrefs cause warnings/build errors
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-facebook fa-lg"></i>
                  </a>
                  <a href="" target="_blank" rel="noreferrer">
                    <i className="fa fa-twitter fa-lg"></i>
                  </a>
                  <a href="">
                    <i className="fa fa-envelope fa-lg"></i>
                  </a>
                  */}
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
          {!item ? (
            <Skeleton width="180px" height="28px" />
          ) : (
            <Link to={`/item-details/${item.nftId}`}>
              <h4>{item.title}</h4>
            </Link>
          )}
          <div className="nft__item_price">
            {!item ? (
              <Skeleton width="90px" height="20px" />
            ) : (
              <>
                {item.price} ETH
              </>
            )}
          </div>
          <div className="nft__item_like">
            {!item ? (
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
  );
};

export default ItemCard;
