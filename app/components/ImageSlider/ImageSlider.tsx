import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ImageSlider.module.css';

interface ImageSliderProps {
    imagePaths: string[];
    onImageClick?: (imagePath: string) => void;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ imagePaths, onImageClick }) => {
    const [positionIndexes, setPositionIndexes] = useState<number[]>([0, 1, 2, 3, 4]);
    const [isScrolling, setIsScrolling] = useState(false);

    const handleCenterImageClick = (imagePath:string) => {
        if (onImageClick) {
            onImageClick(imagePath);
        }
    };


    const handleNext = () => {
        setPositionIndexes(prevIndexes => prevIndexes.map(prevIndex => (prevIndex + 1) % 5));
    };

    const handlePrev = () => {
        setPositionIndexes(prevIndexes => 
            prevIndexes.map(prevIndex => (prevIndex - 1 + 5) % 5) // "+ 5" ensures that the value remains positive
        );
    };
    

    const handleSwipe = (event: React.WheelEvent) => {
        if (isScrolling) return;  // If already scrolling, do nothing
    
        if (event.deltaX > 0) {
            handleNext();
        } else if (event.deltaX < 0) {
            handlePrev();
        }
    
        setIsScrolling(true);  // Set the isScrolling state to true

        setTimeout(() => {
            setIsScrolling(false);
        }, 200);  // 200ms delay, can adjust based on testing
    };
    
    

    const positions = ['center', 'left1', 'left', 'right', 'right1'];

    const imageVariants = {
        center: { x: '0%', scale: 1, zIndex: 5 },
        left1: { x: '-50%', scale: 0.7, zIndex: 2 },
        left: { x: '-90%', scale: 0.5, zIndex: 1 },
        right: { x: '90%', scale: 0.5, zIndex: 1 },
        right1: { x: '50%', scale: 0.7, zIndex: 2 },
    };

    return (
        <div className={styles.container} 
        onWheel={handleSwipe}
        >
            {imagePaths.map((imagePath, index) => (
                <motion.img
                    key={index}
                    src={imagePath}
                    alt="image"
                    className={styles.image}
                    initial="center"
                    animate={positions[positionIndexes[index]]}
                    variants={imageVariants}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleCenterImageClick(imagePath)}
                />
            ))}
        </div>
    );
};

export default ImageSlider;
