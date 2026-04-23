import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiUrl } from "../helper/const";
import "./Homepage.css";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Slider images - you can replace these with your own
  const sliderImages = [
    {
      url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      title: "Fashion Collection 2026",
      subtitle: "Discover the latest trends",
    },
    {
      url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=600&fit=crop",
      title: "Tech Innovation",
      subtitle: "Latest electronics and gadgets",
    },
    {
      url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      title: "Home & Living",
      subtitle: "Transform your space",
    },
  ];

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${apiUrl}api/categories`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Auto-slide functionality
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [sliderImages.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === sliderImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? sliderImages.length - 1 : prev - 1,
    );
  };

  // Filter top-level categories (parent_id is null)
  const topLevelCategories = categories.filter((cat) => cat.parent_id === null);

  return (
    <div className="homepage">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        <div className="slider-container">
          <div
            className="slider-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((slide, index) => (
              <div key={index} className="slide">
                <img src={slide.url} alt={slide.title} />
                <div className="slide-content">
                  <h1>{slide.title}</h1>
                  <p>{slide.subtitle}</p>
                  <button className="cta-button">Shop Now</button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button className="slider-btn prev-btn" onClick={prevSlide}>
            ❮
          </button>
          <button className="slider-btn next-btn" onClick={nextSlide}>
            ❯
          </button>

          {/* Dots indicator */}
          <div className="slider-dots">
            {sliderImages.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <h2>Shop by Category</h2>

          {loading && (
            <div className="loading">
              <p>Loading categories...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>Error loading categories: {error}</p>
              <button onClick={() => window.location.reload()}>Retry</button>
            </div>
          )}

          {!loading && !error && (
            <div className="categories-grid">
              {topLevelCategories.map((category) => (
                <div
                  onClick={() => navigate(`/${category.id}`)}
                  key={category.id}
                  className="category-card"
                >
                  <div className="category-image">
                    <img
                      src={category.image_url}
                      alt={category.name}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x200?text=No+Image";
                      }}
                    />
                  </div>
                  <div className="category-info">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <button className="category-btn">
                      Explore {category.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && categories.length === 0 && (
            <div className="no-categories">
              <p>No categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-section">
        <div className="container">
          <h2>Why Choose Us?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free delivery on orders over $50</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>100% secure payment processing</p>
            </div>
            <div className="feature">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day hassle-free returns</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⭐</div>
              <h3>Quality Guarantee</h3>
              <p>Premium quality products only</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
