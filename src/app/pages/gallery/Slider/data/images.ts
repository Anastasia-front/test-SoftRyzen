import { getAltFromImageName } from "@/app/helpers";

import image1 from "@/app/assets/gallery/autumn.jpg";
import image2 from "@/app/assets/gallery/colorfulPicture.jpg";
import image3 from "@/app/assets/gallery/fogInForest.jpg";
import image4 from "@/app/assets/gallery/lake.jpg";
import image5 from "@/app/assets/gallery/riverAndHouseInForest.jpg";

export const images = [
  { id: 3, src: image3, alt: getAltFromImageName(image3.src) },
  { id: 2, src: image2, alt: getAltFromImageName(image2.src) },
  { id: 4, src: image4, alt: getAltFromImageName(image4.src) },
  { id: 1, src: image1, alt: getAltFromImageName(image1.src) },
  { id: 5, src: image5, alt: getAltFromImageName(image5.src) },
];
