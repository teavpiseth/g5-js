-- Insert 10 categories for e-commerce database
-- Mix of top-level and child categories

INSERT INTO
    categories (
        name,
        slug,
        description,
        parent_id,
        image_url,
        is_visible,
        sort_order
    )
VALUES (
        'Clothing',
        NULL,
        'All clothing items including shirts, pants, dresses and accessories',
        NULL,
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
        TRUE,
        1
    ),
    (
        'Electronics',
        NULL,
        'Electronic devices, gadgets and tech accessories',
        NULL,
        'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop',
        TRUE,
        2
    ),
    (
        'Home & Garden',
        NULL,
        'Home improvement, furniture, and garden supplies',
        NULL,
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=300&fit=crop',
        TRUE,
        3
    ),
    (
        'Sports & Fitness',
        NULL,
        'Sports equipment, fitness gear, and athletic wear',
        NULL,
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=300&fit=crop',
        TRUE,
        4
    ),
    (
        'T-Shirts',
        NULL,
        'Casual and formal t-shirts for all occasions',
        1,
        'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=300&fit=crop',
        TRUE,
        1
    ),
    (
        'Jeans',
        NULL,
        'Denim jeans in various styles and fits',
        1,
        'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=300&fit=crop',
        TRUE,
        2
    ),
    (
        'Dresses',
        NULL,
        'Formal and casual dresses for women',
        1,
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=300&fit=crop',
        TRUE,
        3
    ),
    (
        'Smartphones',
        NULL,
        'Latest smartphones and mobile devices',
        2,
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=300&fit=crop',
        TRUE,
        1
    ),
    (
        'Laptops',
        NULL,
        'Computers and laptops for work and gaming',
        2,
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=300&fit=crop',
        TRUE,
        2
    ),
    (
        'Running Shoes',
        NULL,
        'Professional running and athletic footwear',
        4,
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop',
        TRUE,
        1
    );