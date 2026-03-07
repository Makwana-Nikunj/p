import React from "react";
import productService from "../../appwrite/productService";
import OwnerItemCard from "./OwnerItemCard";

const OwnerProduct = ({ products }) => {

  return (
    <div className="w-full">
      <div className="mt-5 w-full flex justify-center items-center gap-4 flex-wrap">

        {products.map((doc) => (
          <OwnerItemCard
            key={doc.$id}
            id={doc.$id}
            imgUrl={productService.getFileView(doc.imageId)}
            category={doc.category}
            name={doc.title}
            price={doc.price}
          />
        ))}

      </div>
    </div>
  );
};

export default OwnerProduct;
