// Import components for blocks and functionality
import FunctionsJs from "./functions";
import Counters from "./blocks/counter";
import CarouselSlider from "./blocks/carousel-slider";
import Insight from "./blocks/insights";
import Team from "./blocks/team";
import Sectors from "./blocks/sectors";
import ContentMedia from "./blocks/content-media";

document.addEventListener("DOMContentLoaded", async () => {
	FunctionsJs.init();
	Counters.init();
	CarouselSlider.init();
	Insight.init();
	Team.init();
	Sectors.init();
	ContentMedia.init();
});
