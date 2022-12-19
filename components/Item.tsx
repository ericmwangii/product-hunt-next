import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { itemInfo } from "../interface/itemInfo";

export const Item: React.FC<itemInfo> = ({
  imageUrl,
  name,
  price,
  itemUrl,
  source,
}) => {
  return (
    <div className="col">
      <Link href={itemUrl}>
        <div className="card h-100">
          <Image
            src={imageUrl}
            className="card-img-top"
            alt="product-photo"
            width={340}
            height={300}
          />
          <div className="card-body">
            <h5 className="card-title">
              <strong>{price}</strong>
            </h5>
            <p className="card-text">{name}</p>
            <p className="card-text">
              <strong>From {source}</strong>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Item;
