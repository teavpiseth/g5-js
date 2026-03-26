-- Insert 2 products for each category (20 products total)
-- NOTE: slug field is defined as NOT NULL in schema, but setting to empty string for now
-- You may need to ALTER TABLE to allow NULL or update these values later

INSERT INTO
    products (
        name,
        slug,
        description,
        category_id,
        brand,
        base_price,
        is_active
    )
VALUES

-- Products for Clothing category (id = 1)
(
    'Classic Cotton T-Shirt',
    '',
    'Comfortable 100% cotton t-shirt perfect for everyday wear',
    1,
    'ComfortWear',
    19.99,
    TRUE
),
(
    'Premium Polo Shirt',
    '',
    'High-quality polo shirt made from premium cotton blend',
    1,
    'StyleMax',
    34.99,
    TRUE
),

-- Products for Electronics category (id = 2)
(
    'Wireless Bluetooth Headphones',
    '',
    'High-quality wireless headphones with noise cancellation',
    2,
    'AudioTech',
    89.99,
    TRUE
),
(
    'Smartphone Wireless Charger',
    '',
    'Fast wireless charging pad compatible with all Qi devices',
    2,
    'ChargeMaster',
    29.99,
    TRUE
),

-- Products for Home & Garden category (id = 3)
(
    'Ceramic Plant Pot Set',
    '',
    'Set of 3 beautiful ceramic pots perfect for indoor plants',
    3,
    'GreenHome',
    45.99,
    TRUE
),
(
    'LED Table Lamp',
    '',
    'Modern LED table lamp with adjustable brightness settings',
    3,
    'BrightLight',
    67.99,
    TRUE
),

-- Products for Sports & Fitness category (id = 4)
(
    'Yoga Mat Premium',
    '',
    'Non-slip yoga mat made from eco-friendly materials',
    4,
    'FitLife',
    39.99,
    TRUE
),
(
    'Resistance Band Set',
    '',
    'Complete set of resistance bands for home workouts',
    4,
    'PowerFit',
    24.99,
    TRUE
),

-- Products for T-Shirts category (id = 5)
(
    'Graphic Print T-Shirt',
    '',
    'Trendy graphic t-shirt with unique artistic design',
    5,
    'UrbanStyle',
    22.99,
    TRUE
),
(
    'V-Neck Basic Tee',
    '',
    'Essential v-neck t-shirt in premium soft cotton',
    5,
    'Essentials',
    16.99,
    TRUE
),

-- Products for Jeans category (id = 6)
(
    'Slim Fit Dark Wash Jeans',
    '',
    'Classic slim fit jeans in dark indigo wash',
    6,
    'DenimCo',
    79.99,
    TRUE
),
(
    'High-Waisted Straight Leg Jeans',
    '',
    'Vintage-inspired high-waisted jeans with straight leg cut',
    6,
    'RetroFit',
    89.99,
    TRUE
),

-- Products for Dresses category (id = 7)
(
    'Floral Summer Dress',
    '',
    'Light and breezy floral dress perfect for summer occasions',
    7,
    'SummerVibes',
    54.99,
    TRUE
),
(
    'Little Black Dress',
    '',
    'Elegant black dress suitable for formal and casual events',
    7,
    'ClassicStyle',
    89.99,
    TRUE
),

-- Products for Smartphones category (id = 8)
(
    'Pro Max Smartphone 256GB',
    '',
    'Latest flagship smartphone with advanced camera system',
    8,
    'TechNova',
    999.99,
    TRUE
),
(
    'Budget Android Phone',
    '',
    'Affordable smartphone with essential features and long battery life',
    8,
    'ValueTech',
    199.99,
    TRUE
),

-- Products for Laptops category (id = 9)
(
    'Gaming Laptop RTX Series',
    '',
    'High-performance gaming laptop with dedicated graphics card',
    9,
    'GameForce',
    1299.99,
    TRUE
),
(
    'Ultrabook Business Laptop',
    '',
    'Lightweight ultrabook perfect for business and productivity',
    9,
    'ProWork',
    849.99,
    TRUE
),

-- Products for Running Shoes category (id = 10)
(
    'Marathon Running Shoes',
    '',
    'Professional running shoes designed for long-distance comfort',
    10,
    'RunPro',
    129.99,
    TRUE
),
(
    'Casual Athletic Sneakers',
    '',
    'Versatile sneakers perfect for daily activities and light exercise',
    10,
    'ActiveWear',
    69.99,
    TRUE
);