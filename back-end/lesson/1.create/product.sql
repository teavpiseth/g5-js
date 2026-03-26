CREATE TABLE products (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    name            VARCHAR(255) NOT NULL,
    slug            VARCHAR(255) UNIQUE NOT NULL,
    description     TEXT,
    category_id     BIGINT,
    brand           VARCHAR(100),
    base_price      DECIMAL(10,2),           -- optional fallback
    is_active       BOOLEAN DEFAULT TRUE,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE product_variants (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    product_id      BIGINT NOT NULL,
    
    -- Variant attributes
    size            VARCHAR(50) NULL,        -- 'S', 'M', 'L', 'XL', 'One Size' etc.
    color           VARCHAR(100) NULL,       -- 'Red', '#FF0000', 'Navy Blue' etc.
    
    quantity        INT DEFAULT 0,           -- stock
    price           DECIMAL(10,2) NOT NULL,  -- variant can have different price
    sku             VARCHAR(100) UNIQUE,     -- important for inventory
    
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    
    -- Optional: unique combination per product
    UNIQUE KEY unique_variant (product_id, size, color)
);

CREATE TABLE product_variant_images (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    variant_id      BIGINT NOT NULL,
    
    image_url       VARCHAR(500) NOT NULL,   -- or store as S3 path
    alt_text        VARCHAR(255),
    is_primary      BOOLEAN DEFAULT FALSE,   -- main thumbnail
    display_order   INT DEFAULT 0,           -- 0,1,2... for carousel order
    
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (variant_id) REFERENCES product_variants(id) ON DELETE CASCADE
);

CREATE TABLE categories (
    id              BIGINT PRIMARY KEY AUTO_INCREMENT,
    
    name            VARCHAR(120) NOT NULL,          -- "T-Shirts", "Smartphones", "Running Shoes"
    slug            VARCHAR(150) UNIQUE NOT NULL,   -- "t-shirts", "smartphones", "running-shoes"
    description     TEXT,
    
    parent_id       BIGINT NULL,                    -- NULL = top-level category
    FOREIGN KEY (parent_id) REFERENCES categories(id) 
        ON DELETE SET NULL,                         -- or ON DELETE CASCADE if you prefer
    
    image_url       VARCHAR(500),                  -- category banner / icon
    is_visible      BOOLEAN DEFAULT TRUE,
    sort_order      INT DEFAULT 0,                  -- for manual ordering
    
    -- Timestamps
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Very useful index
CREATE INDEX idx_category_parent ON categories(parent_id);