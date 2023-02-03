import { Carousel } from "./components/Carousel";
import { ExploreTopBooks } from "./components/ExploreTopBoooks";
import { Heros } from "./components/Heros";
import { LibraryServices } from "./components/LibraryServices";

export const HomePage = () =>{
    return(
    <>
      <ExploreTopBooks/>
      <Carousel/>
      <Heros/>
      <LibraryServices/>
    </>
    );
}