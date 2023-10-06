import styles from '../[slug]/styles.module.css';

export const handleKeylineAnimation = (entry: IntersectionObserverEntry) => {
  const keylineElement = entry.target.querySelector(`.${styles.keyline}`) as HTMLElement | null; 
  if (keylineElement) {
      keylineElement.style.height = "100%";
      const dots = Array.from(keylineElement.querySelectorAll(`.${styles.keydot}`));
      const texts = Array.from(keylineElement.querySelectorAll(`.${styles.keytext}`));
      
      if (dots.length !== texts.length) {
          console.error('Mismatch between number of dots and texts.');
          return;
      }

      const checkDotsVisibility = () => {
          let allDotsVisible = true;
          const currentTopPosition = (keylineElement.getBoundingClientRect().bottom / window.innerHeight) * 100;

          dots.forEach((dot: HTMLElement, index) => {
              const intendedTop = [20, 40, 60, 80][index];
              if (currentTopPosition >= intendedTop) {
                  dot.style.opacity = '1';
                  texts[index].style.opacity = '1';  // Assuming each dot has a corresponding text at the same index
              } else {
                  allDotsVisible = false;
              }
          });

          if (!allDotsVisible) {
              requestAnimationFrame(checkDotsVisibility);
          }
      };

      requestAnimationFrame(checkDotsVisibility);
  }
};
