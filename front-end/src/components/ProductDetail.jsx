import { Image } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProductDetail.css";

const FALLBACK_IMAGE = "";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/products/web/${productId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Product not found");
          }

          throw new Error("Failed to fetch product detail");
        }

        const data = await response.json();
        const nextProduct = data?.data || null;
        setProduct(nextProduct);
      } catch (err) {
        setProduct(null);
        setError(err.message || "Failed to load product detail");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const galleryImages = useMemo(() => {
    if (!product) return [];

    const orderedImages = [];

    if (product.image_url) {
      orderedImages.push({
        id: `cover-${product.id}`,
        image_url: product.image_url,
        alt_text: product.name,
      });
    }

    (product.images || []).forEach((image) => {
      if (!orderedImages.some((item) => item.image_url === image.image_url)) {
        orderedImages.push(image);
      }
    });

    return orderedImages;
  }, [product]);

  useEffect(() => {
    setSelectedImage(galleryImages[0]?.image_url || "");
  }, [galleryImages]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="pd-container">
          <p className="pd-state">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-page">
        <div className="pd-container">
          <p className="pd-state pd-error">Error: {error}</p>
          <div className="pd-actions">
            <button
              className="pd-btn"
              onClick={() => window.location.reload()}
              type="button"
            >
              Retry
            </button>
            <button
              className="pd-btn pd-btn-secondary"
              onClick={() => navigate(-1)}
              type="button"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="pd-container">
          <p className="pd-state">Product not found.</p>
          <button
            className="pd-btn"
            onClick={() => navigate("/")}
            type="button"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const displayPrice = Number(product.price || 0).toLocaleString();

  return (
    <div className="product-detail-page">
      <div className="pd-container">
        <nav className="pd-breadcrumb" aria-label="breadcrumb">
          <Link to="/">Home</Link>
          {product.category_id ? (
            <>
              <span className="pd-separator">/</span>
              <Link to={`/category/${product.category_id}`}>
                {product.category_name || "Category"}
              </Link>
            </>
          ) : null}
          <span className="pd-separator">/</span>
          <strong>{product.name}</strong>
        </nav>

        <section className="pd-hero">
          <div className="pd-gallery">
            <div className="pd-main-image-wrap">
              <img
                className="pd-main-image"
                src={selectedImage || FALLBACK_IMAGE}
                alt={product.name}
                onError={(e) => {
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
            </div>

            {galleryImages.length > 1 ? (
              <div className="pd-thumb-list">
                {galleryImages.map((image) => (
                  <button
                    key={image.id}
                    type="button"
                    className={`pd-thumb ${selectedImage === image.image_url ? "active" : ""}`}
                    onClick={() => setSelectedImage(image.image_url || "")}
                  >
                    <img
                      src={image.image_url || FALLBACK_IMAGE}
                      alt={image.alt_text || product.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="pd-summary">
            <p className="pd-category-label">
              {product.category_name || "Product"}
            </p>
            <h1>{product.name}</h1>
            <p className="pd-price">${displayPrice}</p>
            <div className="pd-meta">
              <span>
                <strong>Brand:</strong> {product.brand || "N/A"}
              </span>
              <span>
                <strong>Status:</strong>{" "}
                {Number(product.is_active) === 1 ? "Available" : "Unavailable"}
              </span>
            </div>
            <p className="pd-description">
              {product.description || "No description available."}
            </p>
            <div className="pd-actions">
              {product.category_id ? (
                <button
                  className="pd-btn"
                  type="button"
                  onClick={() => navigate(`/category/${product.category_id}`)}
                >
                  Back to Category
                </button>
              ) : null}
              <button
                className="pd-btn pd-btn-secondary"
                type="button"
                onClick={() => navigate(-1)}
              >
                Go Back
              </button>
            </div>
          </div>
        </section>

        <section className="pd-section">
          <h2>Variants</h2>
          {product.variants?.length ? (
            <div className="pd-variant-grid">
              {product.variants.map((variant) => (
                <div key={variant.id} className="pd-variant-card">
                  <div className="pd-variant-header">
                    <Image.PreviewGroup
                      items={variant.images.map((img) => ({
                        src: img.image_url || FALLBACK_IMAGE,
                        alt: variant.sku || product.name,
                      }))}
                    >
                      <Image
                        alt="webp image"
                        width={200}
                        src={variant.images[0].image_url}
                      />
                    </Image.PreviewGroup>
                    {/* <img
                      src={
                        variant.image_url || product.image_url || FALLBACK_IMAGE
                      }
                      alt={variant.sku || product.name}
                      onError={(e) => {
                        e.target.src = FALLBACK_IMAGE;
                      }}
                    /> */}
                    <div>
                      <h3>{variant.sku || `Variant #${variant.id}`}</h3>
                      <p>${Number(variant.price || 0).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="pd-variant-meta">
                    <span>Color: {variant.color || "-"}</span>
                    <span>Size: {variant.size || "-"}</span>
                    <span>Stock: {variant.quantity ?? 0}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="pd-state">No variants available for this product.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProductDetail;
