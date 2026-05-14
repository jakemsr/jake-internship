import React from "react";
import ItemCard from "../UI/ItemCard";

const AuthorItems = ({ items, authorImage, authorId }) => {
  for (const item of items) {
    if (item) {
      item.authorImage = authorImage;
      item.authorId = authorId;
    }
  }
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {items.map((item, index) => (
            <ItemCard key={index} item={item} index={index} page="author" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
