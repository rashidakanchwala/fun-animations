// productType.ts
export type PRODUCT_TYPE = {
  cover: {
    cover_image: string;
    cover_title: string;
    cover_description: string;
  };
  blurb: {
    description: string;
  };
  impact: {
    delivery: string;
  };
  demo: {
    demo_title: string;
    demo_image: string;
    demo_description: string;
    demo_link: string;
  };
  distribution_deployment: {
    image1: string;
  };
};
