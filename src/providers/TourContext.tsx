import { createContext } from "react";
import { Step } from "src/components/Tour";

export type TourContextType = [
  { next: () => void },
  {
    currentStep: Step;
    setRect: (rect: DOMRect | null) => void;
  }
];

const TourContext = createContext<TourContextType>([
  {
    next: () => {},
  },
  {
    currentStep: {
      content: "",
      stepId: "",
    },
    setRect: () => {},
  },
]);

export default TourContext;
