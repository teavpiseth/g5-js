import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProductCategory.css";

const FALLBACK_IMAGE = "";

const ProductCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/categories/web`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data?.data || []);
      } catch (err) {
        setError(err.message || "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const visibleCategories = useMemo(
    () => categories.filter((category) => Number(category.is_visible) === 1),
    [categories],
  );

  const categoryMap = useMemo(
    () =>
      new Map(
        visibleCategories.map((category) => [String(category.id), category]),
      ),
    [visibleCategories],
  );

  const currentCategory = useMemo(
    () => categoryMap.get(String(categoryId)) || null,
    [categoryMap, categoryId],
  );

  const childCategories = useMemo(
    () =>
      visibleCategories.filter(
        (category) => String(category.parent_id) === String(categoryId),
      ),
    [visibleCategories, categoryId],
  );

  const breadcrumb = useMemo(() => {
    if (!currentCategory) return [];

    const path = [];
    const seen = new Set();
    let node = currentCategory;

    while (node && !seen.has(node.id)) {
      path.unshift(node);
      seen.add(node.id);

      if (node.parent_id === null) break;
      node = categoryMap.get(String(node.parent_id));
    }

    return path;
  }, [currentCategory, categoryMap]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        const response = await fetch(
          `/api/products/web?category_id=${categoryId}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log("Fetched products:", data);
        setProducts(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        setProducts([]);
        console.error("Error fetching products:", err);
      } finally {
        setProductsLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  if (loading) {
    return (
      <div className="product-category-page">
        <div className="pc-container">
          <p className="pc-state">Loading category...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-category-page">
        <div className="pc-container">
          <p className="pc-state pc-error">Error: {error}</p>
          <button
            className="pc-btn"
            onClick={() => window.location.reload()}
            type="button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="product-category-page">
        <div className="pc-container">
          <p className="pc-state">Category not found.</p>
          <button
            className="pc-btn"
            onClick={() => navigate("/")}
            type="button"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-category-page">
      <div className="pc-container">
        <nav className="pc-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link>
          {breadcrumb.map((item) => (
            <span key={item.id}>
              <span className="pc-separator">/</span>
              {item.id === currentCategory.id ? (
                <strong>{item.name}</strong>
              ) : (
                <Link to={`/category/${item.id}`}>{item.name}</Link>
              )}
            </span>
          ))}
        </nav>

        {/* <div className="pc-hero">
          <img
            src={currentCategory.image_url || FALLBACK_IMAGE}
            alt={currentCategory.name}
            onError={(e) => {
              e.target.src = FALLBACK_IMAGE;
            }}
          />
          <div>
            <h1>{currentCategory.name}</h1>
            <p>{currentCategory.description || "N/A"}</p>
          </div>
        </div> */}

        <section>
          <h2>Sub Categories</h2>
          {childCategories.length === 0 ? (
            <p className="pc-state">No sub categories in this category.</p>
          ) : (
            <div className="flex flex-wrap gap-4">
              {childCategories.map((category) => (
                <div
                  key={category.id}
                  className="flex-1"
                  style={{ maxWidth: 90 }}
                >
                  <div
                    className="pc-card"
                    onClick={() => navigate(`/category/${category.id}`)}
                    style={{ width: "100%" }}
                  >
                    <img
                      src={category.image_url || FALLBACK_IMAGE}
                      alt={category.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                      style={{
                        maxHeight: 90,
                        maxWidth: 90,
                        objectFit: "contain",
                      }}
                    />
                    <div>
                      <h3 style={{ marginTop: 0, wordBreak: "break-word" }}>
                        {category.name}
                      </h3>
                      {/* <p>{category.description || ""}</p> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2>Products</h2>
          {productsLoading ? (
            <p className="pc-state">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="pc-state">No products in this category.</p>
          ) : (
            <div className="pc-grid pc-product-grid">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="pc-card pc-product-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="pc-product-image-wrap">
                    <img
                      className="pc-product-image"
                      src={product.image_url || FALLBACK_IMAGE}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                  </div>
                  <div className="pc-product-content">
                    <h3>{product.name}</h3>
                    <p>{product.category_name || ""}</p>
                    <p>Price: ${Number(product.price || 0).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* <section>
          <h2>Top Level Categories</h2>
          <div className="pc-grid">
            {topLevelCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                className={`pc-card ${
                  Number(category.id) === Number(currentCategory.id)
                    ? "active"
                    : ""
                }`}
                onClick={() => navigate(`/category/${category.id}`)}
              >
                <img
                  src={category.image_url || FALLBACK_IMAGE}
                  alt={category.name}
                  onError={(e) => {
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
                <div>
                  <h3>{category.name}</h3>
                  <p>{category.description || "N/A"}</p>
                </div>
              </button>
            ))}
          </div>
        </section> */}
      </div>
    </div>
  );
};

export default ProductCategory;
