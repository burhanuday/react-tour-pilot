import { useContext } from "react";
import TourContext from "src/providers/TourContext";

const useTour = () => {
  const context = useContext(TourContext);

  if (!context) {
    console.error("[react-tour-pilot] useTour must be used within a Tour");
  }

  return context[0];
};

export default useTour;
