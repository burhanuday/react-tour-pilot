import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import TourContext, { TourContextType } from "src/providers/TourContext";

export type TourProps = {
  onTourEnd?: () => void;
  children: JSX.Element | JSX.Element[];
  steps: Step[];
  onStep?: (stepId: string) => void;
};

export type Step = {
  content: JSX.Element | string;
  xOffset?: number;
  yOffset?: number;
  stepId: string;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
};

type Coordinates = {
  top: number;
  left: number;
};

const Tour = ({ onTourEnd, children, steps, onStep }: TourProps) => {
  const [currentStepIndex, setCurrentStep] = useState(0);
  const currentStep = steps[currentStepIndex];
  const [rect, setRect] = useState<DOMRect | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const next = useCallback(() => {
    if (currentStepIndex + 1 === steps.length) {
      onTourEnd?.();
      return;
    }

    setCurrentStep((currentStepIndex) => currentStepIndex + 1);
  }, [steps, currentStepIndex, onTourEnd]);

  const value = useMemo<TourContextType>(() => {
    return [
      { next },
      {
        currentStep,
        setRect,
      },
    ];
  }, [steps, next, currentStep]);

  const coordinates = useMemo<Coordinates>(() => {
    const position = currentStep.tooltipPosition ?? "top";

    if (!rect) {
      return {
        top: 0,
        left: 0,
      };
    }

    let coordinates: Coordinates = {
      top: 0,
      left: 0,
    };

    const tooltipRect = tooltipRef.current?.getBoundingClientRect() ?? null;
    const tooltipHeight = tooltipRect?.height ?? 0;
    const tooltipWidth = tooltipRect?.width ?? 0;

    switch (position) {
      case "top":
        coordinates = {
          top: rect.top - tooltipHeight,
          left: rect.left + rect.width / 2 - tooltipWidth / 2,
        };
        break;
      case "bottom":
        coordinates = {
          top: rect.top + rect.height,
          left: rect.left + rect.width / 2 - tooltipWidth / 2,
        };
        break;
      case "left":
        coordinates = {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.left - tooltipWidth,
        };
        break;
      case "right":
        coordinates = {
          top: rect.top + rect.height / 2 - tooltipHeight / 2,
          left: rect.left + rect.width,
        };
        break;
    }

    coordinates["top"] = coordinates["top"] + (currentStep.yOffset ?? 0);
    coordinates["left"] = coordinates["left"] + (currentStep.xOffset ?? 0);

    return coordinates;
  }, [currentStep, rect]);

  useEffect(() => {
    onStep?.(currentStep.stepId);
  }, [currentStep]);

  return (
    <TourContext.Provider value={value}>
      <div
        ref={tooltipRef}
        style={{
          position: "fixed",
          top: coordinates?.top ?? 0,
          left: coordinates?.left ?? 0,
          zIndex: 10000,
          opacity: rect ? 1 : 0,
        }}
      >
        {currentStep.content}
      </div>
      {children}
    </TourContext.Provider>
  );
};

export default Tour;
