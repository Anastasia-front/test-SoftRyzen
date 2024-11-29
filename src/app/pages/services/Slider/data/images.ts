import image1_1x from "@/app/assets/services/ATVS-1x.jpg";
import image3_1x from "@/app/assets/services/hotAirBallooning-1x.jpg";
import image5_1x from "@/app/assets/services/rafting-1x.jpg";
import image2_1x from "@/app/assets/services/rockClimbing-1x.jpg";
import image4_1x from "@/app/assets/services/skyDiving-1x.jpg";

import image1_2x from "@/app/assets/services/ATVS-2x.jpg";
import image3_2x from "@/app/assets/services/hotAirBallooning-2x.jpg";
import image5_2x from "@/app/assets/services/rafting-2x.jpg";
import image2_2x from "@/app/assets/services/rockClimbing-2x.jpg";
import image4_2x from "@/app/assets/services/skyDiving-2x.jpg";

export const images = [
  image1_2x || image1_1x,
  image2_2x || image2_1x,
  image3_2x || image3_1x,
  image4_2x || image4_1x,
  image5_2x || image5_1x,
];
