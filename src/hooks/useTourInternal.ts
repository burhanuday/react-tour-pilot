import { useContext } from "react";
import TourContext from "src/providers/TourContext";

const useTourInternal = () => {
  const context = useContext(TourContext);

  if (!context) {
    console.error(
      "[react-tour-pilot] useTourInternal must be used within a Tour"
    );
  }

  return context[1];
};

export default useTourInternal;
