import SearchBar from './SearchBar'
import Cart from '../home/featuredproduct/ItemCard'
import { useSelector } from "react-redux"
import productService from "../../appwrite/productService"
import { useState } from "react";

const Browse = () => {

 const products = useSelector((state) => state.products.products);
  
  const activeProducts = products.filter(p => p.status === "active")


  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // FILTER + SEARCH + SORT
  const filtered = activeProducts
    .filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item =>
      category === "all" ? true : item.category === category
    )
    .filter(item => {
      const price = parseFloat(item.price);
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max;
    })
    .sort((a, b) => {
      if (sort === "low-high") return a.price - b.price;
      if (sort === "high-low") return b.price - a.price;
      if (sort === "popular") return (b.views || 0) - (a.views || 0);
      if (sort === "favorites") return (b.favoriteCount || 0) - (a.favoriteCount || 0);
      return new Date(b.$createdAt) - new Date(a.$createdAt);
    });

  return (
    <div className='w-full flex flex-col items-center gap-6 mt-7'>

      {/* Heading */}
      <div className='w-[86%]'>
        <h1 className="font-semibold text-2xl mb-2">Browse Products</h1>
        <p className="text-gray-700">Discover items from your campus community</p>
      </div>

      {/* Search */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      {/* Product List */}
      <div className='w-full'>
        {filtered.length > 0 ? (
          <div className='mt-5 w-full flex justify-center items-center gap-4 flex-wrap'>
            {filtered.map((doc) => (
              <Cart
                key={doc.$id}
                id={doc.$id}
                imgUrl={productService.getFileView(doc.imageId)}
                category={doc.category}
                name={doc.title}
                price={doc.price}
                views={doc.views}
                favoriteCount={doc.favoriteCount}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <svg className="w-24 h-24 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500 text-center max-w-md">
              {search || category !== "all" 
                ? "Try adjusting your filters or search terms"
                : "Be the first to list a product!"
              }
            </p>
          </div>
        )}
      </div>

    </div>
  )
}

export default Browse;
