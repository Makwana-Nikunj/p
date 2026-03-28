import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchMoreProducts } from "../store/productSlice";
import SearchBar from "../Components/browse/SearchBar";
import ItemCard from "../Components/home/featuredproduct/ItemCard";
import { ProductGridSkeleton } from "../Components/SkeletonLoader";
import { useToast } from "../Components/Toast/ToastContainer";
import { Package, SearchX } from "lucide-react";

const Browse = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const products = useSelector((state) => state.products?.products || []);
  const pagination = useSelector((state) => state.products?.pagination || { page: 1, hasMore: true, totalPages: 1, total: 0 });
  const isLoadingMore = useSelector((state) => state.products?.isLoadingMore || false);

  // Local filter state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sort, setSort] = useState("newest");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [campusHub, setCampusHub] = useState("");

  // Curated categories
  const curatedCategories = [
    {
      id: "tech",
      title: "Tech & Gadgets",
      icon: "devices",
      category: "electronics",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDDM1Fld2FEhvp3SM4JxEk6uImd_AJbdhH8O2UBHs4XnNRAYCWleDti0CwNgRAbURWMNvR-4x7aodEqCP3jy45a151Hc5NEZgNzjK9oDXGtC1RFW5e8_dzakjqMdB5jpwD1sOR2CJWWINogBsUZelVEUnR0Hq_KLQ-BjW8JZuAMEs-EmGkX7T1UkEl_r5eofRw8V0XL9BRUYGXyV68zRNbE_rrDl6JzNPaCPyYZKEMg0gTc451ThOApm2zQM-SI0Cq_kwedcAUnTk-j",
    },
    {
      id: "textbooks",
      title: "Textbooks",
      icon: "menu_book",
      category: "textbooks",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB6aWHB5Ard6HIhsUqVF4ghnRDyT9qIUa7QnWxayo9nDDFSRJP_3GLahrYUNL7Jp-FJGQzyk5Oaz9e7_TdFiZydL5t1546EM6NRptPJWgw1w244Pn9QgIUOnxQMi4NxstkD39ZrkMzbGtsvw9sbLDFhsOiv-VHcaIkcZo0sfxOFe2h_8-r-GcM6RHU-JPQWNb2yaPYDYN4ydWDTNiJFBMuufMPrgmkHr2VNG8NY41nMvLJi4KSK-Q4muPjbPorZ4fKpz6zfQbF8rhw0",
    },
    {
      id: "lifestyle",
      title: "Lifestyle",
      icon: "auto_awesome",
      category: "lifestyle",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCR7N_tUqCbasqNQxu8Ixt_mRJpi1Poum10vMeNVhHXg_oNOQxWOWtPNqKsDIuYFicGQhD28e318BhYJpKA_158Sh7dZ41u8OSasKtBVJ4osikcPvBjRqu7g-Woer40bm1ZiT79_PKrPq7tyQdgTebxnU95R9ePMuGn14Z3E2epoCWlCzBW3TTeb56v-XNsbcgsH0V2aXoK0tpaKNaCAtK_Aekx_WFsCDsXSpEnHuMCdHH8Vi3yvSjQWanwiHTb2eMYYzBPbszxsnOr",
    },
    {
      id: "services",
      title: "Campus Services",
      icon: "construction",
      category: "services",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCP652ki164fZqAOtoPiFYSaIZb7q8jgxBhzLQuQ-f-kc9zrU_F4aDR_FGXIetIdfRxdhEUciLJg29e2hIRZBNsXqN5esEIRuhmkP0nb6_nXVqVY1YncS6qSDIQty_uuL7VqpWuG3tdw2HZj4kXG7SmyOExtriAI54zq3fuM0LAqxxyDp6YT-8ZtGvyZBlXD3gHqVZ2vmQu6W-aPp7FO0o-o6d4qmWnHkZGk-G0sAm26aMVzEhpBWcai2g5093gIw1AvIwNOJi5-ukR",
    },
  ];

  // Intersection Observer for infinite scroll
  const lastProductRef = useRef();
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(null); // 'min' or 'max' or null

  // Initial fetch
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (isLoadingMore || !pagination.hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchMoreProducts());
        }
      },
      { threshold: 0.1 }
    );

    if (lastProductRef.current) {
      observer.observe(lastProductRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [dispatch, isLoadingMore, pagination.hasMore]);

  // Filter and sort products locally
  const filteredProducts = useMemo(() => {
    try {
      // Guard against products being undefined
      if (!Array.isArray(products)) {
        console.warn('Products is not an array:', products);
        return [];
      }
      let result = [...products];

      // Search
      if (search) {
        const s = search.toLowerCase();
        result = result.filter((p) => p.title && p.title.toLowerCase().includes(s));
      }

      // Category from curated selection
      if (selectedCategory && selectedCategory !== "all") {
        result = result.filter((p) => p.category && p.category.toLowerCase() === selectedCategory.toLowerCase());
      }

      // Price range
      const min = minPrice && !isNaN(parseInt(minPrice)) ? parseInt(minPrice) : undefined;
      const max = maxPrice && !isNaN(parseInt(maxPrice)) ? parseInt(maxPrice) : undefined;
      if (min !== undefined && !isNaN(min)) {
        console.log('Filtering by min price:', min, 'Sample prices:', result.slice(0, 5).map(p => p.price));
        result = result.filter((p) => {
          const productPrice = parseFloat(p.price);
          return !isNaN(productPrice) && productPrice >= min;
        });
        console.log('After min filter:', result.length);
      }
      if (max !== undefined && !isNaN(max)) {
        console.log('Filtering by max price:', max);
        result = result.filter((p) => {
          const productPrice = parseFloat(p.price);
          return !isNaN(productPrice) && productPrice <= max;
        });
        console.log('After max filter:', result.length);
      }

      // Campus Hub (location)
      if (campusHub) {
        result = result.filter((p) => p.location && p.location.toLowerCase().includes(campusHub.toLowerCase()));
      }

      // Sorting
      switch (sort) {
        case "newest":
          result.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
          break;
        case "low-high":
          result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
          break;
        case "high-low":
          result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
          break;
        case "popular":
          result.sort((a, b) => (b.views || 0) - (a.views || 0));
          break;
        case "favorites":
          result.sort((a, b) => (b.favoriteCount || 0) - (a.favoriteCount || 0));
          break;
        default:
          break;
      }

      console.log('Filtered:', { total: result.length, filtered: result.length, filters: { search, selectedCategory, minPrice, maxPrice, campusHub, sort } });
      return result;
    } catch (error) {
      console.error('Error in filteredProducts useMemo:', error);
      return [];
    }
  }, [products, search, selectedCategory, minPrice, maxPrice, campusHub, sort]);

  // Debug: log filteredProducts type and value
  console.log('filteredProducts:', filteredProducts, 'type:', typeof filteredProducts, 'isArray:', Array.isArray(filteredProducts));

  // Price slider constants
  const PRICE_MIN = 500;
  const PRICE_MAX = 25000;
  const minVal = minPrice && !isNaN(parseInt(minPrice)) ? parseInt(minPrice) : PRICE_MIN;
  const maxVal = maxPrice && !isNaN(parseInt(maxPrice)) ? parseInt(maxPrice) : PRICE_MAX;
  const minPercent = Math.max(0, Math.min(100, ((minVal - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100));
  const maxPercent = Math.max(0, Math.min(100, ((maxVal - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100));

  const handleResetFilters = () => {
    setSearch("");
    setSelectedCategory("all");
    setSort("newest");
    setMinPrice("");
    setMaxPrice("");
    setCampusHub("");
    showToast("Filters cleared", "info", 2000);
  };

  // Handle slider thumb drag
  const handleSliderMouseDown = (type) => (e) => {
    e.preventDefault();
    setDragging(type);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      const price = Math.round(PRICE_MIN + (percentage / 100) * (PRICE_MAX - PRICE_MIN));

      if (dragging === 'min') {
        const max = maxPrice ? parseInt(maxPrice) : PRICE_MAX;
        if (price <= max) {
          setMinPrice(price.toString());
        }
      } else if (dragging === 'max') {
        const min = minPrice ? parseInt(minPrice) : PRICE_MIN;
        if (price >= min) {
          setMaxPrice(price.toString());
        }
      }
    };

    const handleMouseUp = () => {
      setDragging(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, minPrice, maxPrice]);


  return (
    <div className="w-full flex flex-col items-center gap-2 pt-8 pb-24 px-4 md:px-8 relative">
      {/* Prominent Search Bar */}
      <SearchBar
        search={search}
        setSearch={setSearch}
        onSearch={() => { }} // search is reactive, no need explicit submit
      />

      {/* Curated Categories */}
      <div className="w-full max-w-screen-2xl mx-auto sticky top-16 pt-2 pb-4 bg-[#060e20] z-30">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-black uppercase tracking-widest text-on-surface-variant/70 font-plus-jakarta">
            Curated Categories
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {curatedCategories.map((cat) => (
            <div
              key={cat.id}
              className="h-30 rounded-2xl glass-card p-6 flex flex-col justify-end group cursor-pointer hover:border-primary/40 transition-all relative overflow-hidden"
              onClick={() => setSelectedCategory(cat.category)}
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700 -z-10"
              />
              <span className={`material-symbols-outlined ${selectedCategory === cat.category ? 'text-primary' : 'text-on-surface-variant'} mb-2 text-2xl`}>
                {cat.icon}
              </span>
              <h3 className="font-bold font-plus-jakarta text-on-surface text-xl">{cat.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
        {/* Filters Sidebar - Inline to prevent remount issues */}
        <aside className="lg:col-span-1">
          <div className="sticky top-[16rem] glass-card rounded-[2rem] p-8 space-y-10 border border-white/5 shadow-2xl max-h-[calc(100vh-20rem)] overflow-y-auto">
            <div>
              <h3 className="text-xl font-extrabold font-plus-jakarta mb-6 text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">filter_list</span>
                Filters
              </h3>
            </div>

            {/* Sort By */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-4">
                Sort By
              </h4>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-xl py-3 px-4 text-xs font-bold text-on-surface appearance-none focus-glow-indigo"
                >
                  <option value="newest">Newest First</option>
                  <option value="low-high">Lowest to Highest Price</option>
                  <option value="high-low">Highest to Lowest Price</option>
                  <option value="popular">Most Popular</option>
                  <option value="favorites">Most Favorited</option>
                </select>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-4">
                Price Range (₹)
              </h4>
              <div className="relative pt-2" ref={sliderRef}>
                <div className="h-1.5 bg-surface-container-highest rounded-full">
                  <div
                    className="absolute h-full bg-primary rounded-full"
                    style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                  ></div>
                </div>
                {/* Thumbs */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-2 border-[#0C0C0C] shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-pointer active:cursor-grabbing"
                  style={{ left: `${minPercent}%` }}
                  onMouseDown={handleSliderMouseDown('min')}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleSliderMouseDown('min')(e.touches[0]);
                  }}
                ></div>
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-2 border-[#0C0C0C] shadow-[0_0_15px_rgba(99,102,241,0.5)] cursor-pointer active:cursor-grabbing"
                  style={{ left: `${maxPercent}%` }}
                  onMouseDown={handleSliderMouseDown('max')}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    handleSliderMouseDown('max')(e.touches[0]);
                  }}
                ></div>
              </div>
              {/* Price inputs */}
              <div className="flex justify-between mt-6 gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={minPrice}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/\D/g, '');
                      setMinPrice(value);
                    }}
                    className="w-full pl-6 pr-2 py-2 rounded-lg bg-surface-container-highest text-on-surface text-sm border border-subtle focus-glow-indigo transition-all"
                    placeholder="500+"
                  />
                </div>
                <span className="self-center text-on-surface-variant">-</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-on-surface-variant">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={maxPrice}
                    onChange={(e) => {
                      // Only allow digits
                      const value = e.target.value.replace(/\D/g, '');
                      setMaxPrice(value);
                    }}
                    className="w-full pl-6 pr-2 py-2 rounded-lg bg-surface-container-highest text-on-surface text-sm border border-subtle focus-glow-indigo transition-all"
                    placeholder="25000"
                  />
                </div>
              </div>
            </div>

            {/* Campus Hub */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-on-surface-variant mb-4">
                Campus Hub
              </h4>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-primary text-sm">
                  location_on
                </span>
                <select
                  value={campusHub}
                  onChange={(e) => setCampusHub(e.target.value)}
                  className="w-full bg-surface-container-highest border-none rounded-xl py-3 pl-10 pr-4 text-xs font-bold text-on-surface appearance-none focus-glow-indigo"
                >
                  <option value="">All Locations</option>
                  <option value="North Campus Library">North Campus Library</option>
                  <option value="Engineering Block A">Engineering Block A</option>
                  <option value="Student Activity Center">Student Activity Center</option>
                  <option value="Hostel Block C">Hostel Block C</option>
                </select>
              </div>
            </div>

            <button
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary/10 to-tertiary/10 border border-primary/20 text-primary font-bold text-sm hover:bg-primary hover:text-on-primary transition-all"
              onClick={handleResetFilters}
            >
              Reset Filters
            </button>
          </div>
        </aside>

        <div className="lg:col-span-3 xl:col-span-3 max-h-[calc(100vh-20rem)] overflow-y-auto pr-2">
          {(filteredProducts || []).length === 0 && !isLoadingMore ? (
            <div className="flex flex-col items-center justify-center py-20 px-4 animate-fadeIn">
              <div className="p-4 glass-card rounded-full mb-6">
                {search || selectedCategory !== "all" || minPrice || maxPrice || campusHub ? (
                  <SearchX className="w-12 h-12 text-primary" />
                ) : (
                  <Package className="w-12 h-12 text-on-surface-variant" />
                )}
              </div>
              <h3 className="text-2xl font-bold font-plus-jakarta text-on-surface mb-2">
                No products found
              </h3>
              <p className="text-on-surface-variant text-center max-w-md mb-6">
                {search || selectedCategory !== "all" || minPrice || maxPrice || campusHub
                  ? "Try adjusting your filters or search terms"
                  : "No products available at the moment. Be the first to list one!"}
              </p>
              {(search || selectedCategory !== "all" || minPrice || maxPrice || campusHub) && (
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2 bg-primary/10 border border-primary/30 text-primary font-bold rounded-xl hover:bg-primary hover:text-on-primary transition-all"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 border-l border-primary/10 pl-6">
                {filteredProducts.map((doc, index) => {
                  const isLast = index === filteredProducts.length - 1;
                  return (
                    <div
                      key={doc.$id}
                      ref={isLast ? lastProductRef : null}
                      className="animate-fadeIn min-h-[320px]"
                    >
                      <ItemCard
                        id={doc.$id}
                        imgUrl={doc.imageId}
                        category={doc.category}
                        name={doc.title}
                        price={doc.price}
                        views={doc.views}
                        favoriteCount={doc.favoriteCount}
                        condition={doc.condition}
                        sellerName={doc.sellerName}
                        sellerAvatar={doc.sellerAvatar}
                        rating={doc.rating}
                      />
                    </div>
                  );
                })}
              </div>

              {isLoadingMore && (
                <div className="w-full py-8">
                  <ProductGridSkeleton count={8} />
                </div>
              )}

              <div className="text-center text-on-surface-variant text-sm mt-6 animate-fadeIn">
                Showing {(filteredProducts || []).length} of {(products || []).length} loaded
                {pagination?.hasMore && " • Scroll for more"}
              </div>
            </>
          )}
        </div>



      </div>
    </div>
  );
};

export default Browse;
