"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';
import Scrollspy from 'react-scrollspy';
import { PRODUCT_TYPE, Product } from './productType'
import  ImageSlider  from '../components/ImageSlider';



export default function Home({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<PRODUCT_TYPE | null>(null);
  const [activeSection, setActiveSection] = useState<string>('');
  const [clickedImage, setClickedImage] = useState<string | null>(null);
  const [animatedSection, setAnimatedSection] = useState<string | null>(null);

  console.log(clickedImage)


  const { slug } = params;

  const imagePaths = [
    '/images/city1.png',
    '/images/city2.png',
    '/images/city3.png',
    '/images/planet2.png',
    '/images/planet1.png',
  ];


  useEffect(() => {
    if (!slug) return;

    fetch(`content/${slug}.json`)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch data.");
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => console.error("There was an error fetching the JSON:", error));

  }, [slug]);

  const [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref] = Array(6).fill(0).map(() => useRef<HTMLDivElement>(null));

  const sectionsRefs = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref];


  useEffect(() => {
    if (!data) return;
  
    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setAnimatedSection(entry.target.id);
        }
    });
    };
  
    const observerOptions = {
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver(callback, observerOptions);
  
    // Assuming sectionsRefs is an array of refs for each section
    sectionsRefs.forEach(ref => ref.current && observer.observe(ref.current));
  
    return () => {
      sectionsRefs.forEach(ref => ref.current && observer.unobserve(ref.current));
    };
  }, [data, sectionsRefs]);

  const handleImageClick = (imagePath: string) => {
    setClickedImage(imagePath);
  };

  useEffect(() => {
    if (clickedImage) {
        section2Ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [clickedImage]);
  


  return (
    <div className={styles.container}>
      <div className={styles.scrollspy}>
         <div className={`${styles.dot} ${activeSection === 'section1' ? styles.active : ''}`} id="dot-section1"></div>
         <div className={`${styles.dot} ${activeSection === 'section2' ? styles.active : ''}`} id="dot-section2"></div>
         <div className={`${styles.dot} ${activeSection === 'section3' ? styles.active : ''}`} id="dot-section3"></div>
         <div className={`${styles.dot} ${activeSection === 'section4' ? styles.active : ''}`} id="dot-section4"></div>
         <div className={`${styles.dot} ${activeSection === 'section5' ? styles.active : ''}`} id="dot-section5"></div>
      </div>
      {data && (
        <>
          {/* Products Section */}
            <div ref={section1Ref} id="section1" 
            className={`${styles.section} ${styles.blue} ${animatedSection === 'section1' ? styles.animate : ''}`}>
              <div className={styles.imageCarousel}>
                <ImageSlider imagePaths={imagePaths} onImageClick={handleImageClick}/>
              </div>
            </div>

          {/* Selected Product Intro */}
             <div 
             ref={section2Ref} 
             id="section2" 
             className={`${styles.section} ${styles.green} ${animatedSection === 'section2' ? styles.animate : ''}`}
             style={{ backgroundImage: `url(${clickedImage})` }}
             >
               <div className={styles.animatedBox}>
                <h1 className={styles.boxTitle}>Your Title</h1>
                <p className={styles.boxDescription}>Your description here.</p>
              </div>
            </div>

          {/* Cover Section */}
          {/* <div 
          ref={section1Ref} 
          id="section1" 
          className={`${styles.section}`}
          style={{
            // backgroundImage: `url(${data.cover.cover_image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',  // just as an example
          }}
        >
            <p className={`${styles.title}`}>{data.cover.cover_title}</p>
            <p className={`${styles.text} ${styles.invisible}`}>{data.cover.cover_description}</p>
            <div className={styles.keyline}>
              {[20, 40, 60, 80].map(percentage => (
                  <div 
                      key={`dot-${percentage}`} 
                      className={styles.keydot} 
                      style={{ top: `calc(${percentage}% - 3px)` }}  // Adjusting for half dot height
                  ></div>
              ))}
              {[20, 40, 60, 80].map(percentage => (
                  <div 
                      key={`text-${percentage}`} 
                      className={styles.keytext} 
                      style={{ top: `calc(${percentage}% - 10px)` }}  // Adjusting for half dot height
                  > Taha</div>
              ))}
            </div>
          </div>   */}
       
  
          {/* Demo Section */}
          <div ref={section4Ref} id="section4" className={`${styles.section} ${styles.yellow}`}>
            <h2 className={`${styles.text} ${styles.invisible}`}>{data.demo.demo_title}</h2>
            <img src={data.demo.demo_image} alt={data.demo.demo_title} />
            <p className={`${styles.text} ${styles.invisible}`}>{data.demo.demo_description}</p>
            <a href={data.demo.demo_link}>View Demo</a>
          </div>
  
          {/* Distribution & Deployment Section 1 */}
          <div ref={section5Ref} id="section5" className={`${styles.section} ${styles.purple}`}>
            <h2 className={`${styles.text} ${styles.invisible}`}>Distribution & Deployment</h2>
            <img src={data.distribution_deployment.image1} alt="Deployment Image 1" />
          </div>
  
          {/* Distribution & Deployment Section 2 */}
          <div ref={section6Ref} id="section6" className={`${styles.section} ${styles.purple}`}>
            <h2 className={`${styles.text} ${styles.invisible}`}>Distribution & Deployment</h2>
            <img src={data.distribution_deployment.image2} alt="Deployment Image 2" />
          </div>
        </>
      )}
  
      <Scrollspy
        items={['section1', 'section2', 'section3', 'section4', 'section5', 'section6']}
        currentClassName={styles.active}
        componentTag="div"
        offset={-50}
        onUpdate={(el) => {
          if (el) {
            setActiveSection(el.id);
          }
        }}
      />
    </div>
  );
}





// "use client";

// import { useState, useEffect, useRef } from 'react';
// import styles from './styles.module.css';
// import Scrollspy from 'react-scrollspy';

// export default function Home({ params }: { params: { slug: string } }) {
//   const [data, setData] = useState(null); 
//   const [activeSection, setActiveSection] = useState<string>('');

//   const { slug } = params;

//   useEffect(() => {
//     // Ensure slug is available before fetching.
//     if (!slug) return;

//     // Fetching data based on slug
//     fetch(`content/${slug}.json`)
//       .then(response => response.json())
//       .then(data => setData(data))
//       .catch(error => console.error("There was an error fetching the JSON:", error));

//     console.log(data)

//   }, [slug]); // Re-run the useEffect when slug changes.

//   const section1Ref = useRef(null);
//   const section2Ref = useRef(null);
//   const section3Ref = useRef(null);
//   const section4Ref = useRef(null);
//   const section5Ref = useRef(null);
//   const section6Ref = useRef(null);


//   useEffect(() => {

//     if (!data) return;
//     const sectionsRefs = [section1Ref, section2Ref, section3Ref, section4Ref, section5Ref, section6Ref];

//     const callback = (entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           const textElement = entry.target.querySelector(`.${styles.text}`);
//           if (textElement) {
//             textElement.classList.remove(styles.invisible);
//             // Apply animation based on the section
//             switch (entry.target.id) {
//               case 'section1':
//                 textElement.classList.add(styles.fadeIn);
//                 break;
//               case 'section2':
//                 textElement.classList.add(styles.slideInRight);
//                 break;
//               case 'section3':
//                 textElement.classList.add(styles.slideInLeft);
//                 break;
//               case 'section4':
//                 textElement.classList.add(styles.zoomIn);
//                 break;
//               case 'section5':
//                 textElement.classList.add(styles.rotateIn);
//                 break;
//               case 'section6':
//                 textElement.classList.add(styles.rotateIn);
//                 break;
//               default:
//                 break;
//             }
//           }
//         }
//       });
//     };

//     const observerOptions = {
//       threshold: 0.1
//     };

//     const observer = new IntersectionObserver(callback, observerOptions);
//     sectionsRefs.forEach(ref => observer.observe(ref.current));

//     return () => {
//       sectionsRefs.forEach(ref => observer.unobserve(ref.current));
//     };
//   }, [data]);


//   return (
//     <div className={styles.container}>
//       <div className={styles.scrollspy}>
//         <div className={`${styles.dot} ${activeSection === 'section1' ? styles.active : ''}`} id="dot-section1"></div>
//         <div className={`${styles.dot} ${activeSection === 'section2' ? styles.active : ''}`} id="dot-section2"></div>
//         <div className={`${styles.dot} ${activeSection === 'section3' ? styles.active : ''}`} id="dot-section3"></div>
//         <div className={`${styles.dot} ${activeSection === 'section4' ? styles.active : ''}`} id="dot-section4"></div>
//         <div className={`${styles.dot} ${activeSection === 'section5' ? styles.active : ''}`} id="dot-section5"></div>
//       </div>

//       {data &&
//       <>
//       {/* Cover Section */}
//       <div ref={section1Ref} id="section1" className={`${styles.section} ${styles.red}`}>
//         <img src={data.cover.cover_image} alt={data.cover.cover_title} />
//         <h1 className={`${styles.text} ${styles.invisible}`}>{data.cover.cover_title}</h1>
//         <p className={`${styles.text} ${styles.invisible}`}>{data.cover.cover_description}</p>
//       </div>

//       {/* Blurb Section */}
//       <div ref={section2Ref} id="section2" className={`${styles.section} ${styles.blue}`}>
//         <h2 className={`${styles.text} ${styles.invisible}`}>Blurb</h2>
//         <p className={`${styles.text} ${styles.invisible}`}>{data.blurb.description}</p>
//       </div>

//       {/* Impact Section */}
//       <div ref={section3Ref} id="section3" className={`${styles.section} ${styles.green}`}>
//         <h2 className={`${styles.text} ${styles.invisible}`}>Impact</h2>
//         <p className={`${styles.text} ${styles.invisible}`}>{data.impact.delivery}</p>
//       </div>

//       {/* Demo Section */}
//       <div ref={section4Ref} id="section4" className={`${styles.section} ${styles.yellow}`}>
//         <h2 className={`${styles.text} ${styles.invisible}`}>{data.demo.demo_title}</h2>
//         <img src={data.demo.demo_image} alt={data.demo.demo_title} />
//         <p className={`${styles.text} ${styles.invisible}`}>{data.demo.demo_description}</p>
//         <a href={data.demo.demo_link}>View Demo</a>
//       </div>

//       {/* Distribution & Deployment Section */}
//       <div ref={section5Ref} id="section5" className={`${styles.section} ${styles.purple}`}>
//         <h2 className={`${styles.text} ${styles.invisible}`}>Distribution & Deployment</h2>
//         <img src={data.distribution_deployment.image1} alt="Deployment Image 1" />
//       </div>

//       {/* Distribution & Deployment Section */}
//       <div ref={section6Ref} id="section6" className={`${styles.section} ${styles.purple}`}>
//         <h2 className={`${styles.text} ${styles.invisible}`}>Distribution & Deployment</h2>
//         <img src={data.distribution_deployment.image1} alt="Deployment Image 1" />
//       </div>
//       </>
//   }
//       <Scrollspy
//         items={['section1', 'section2', 'section3', 'section4', 'section5','section6']}
//         currentClassName={styles.active}
//         componentTag="div"
//         offset={-50}
//         onUpdate={(el) => {
//           if (el) {
//             setActiveSection(el.id);
//           }
//         }}
//       />
//     </div>
//   );
// }
