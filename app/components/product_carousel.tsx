import { motion } from 'framer-motion';
import { Product } from '../[slug]/productType';

interface ProductCarouselProps {
    products: Product[];
}

export function ProductCarousel({ products }: ProductCarouselProps) {
    return (
        <div className="carousel-container">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

interface ProductCardProps {
    product: Product;
    onHover?: () => void;
    onLeave?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onHover, onLeave }) => {
    return (
        <motion.div
            onHoverStart={onHover}
            onHoverEnd={onLeave}
            whileHover={{
                scale: 1.1,
                zIndex: 1
            }}
            className="product-card"
        >
            <img src={product.cover_image} alt={product.cover_title} />
            <h2>{product.cover_title}</h2>
            <p>{product.cover_description}</p>
        </motion.div>
    );
}

export default ProductCard;
