import { useEffect, useRef } from "react";
import useTourInternal from "src/hooks/useTourInternal";

export type StepProps = {
  stepId: string;
  children: JSX.Element | JSX.Element[];
};

const Step = ({ stepId, children }: StepProps) => {
  const {
    setRect,
    currentStep: { stepId: currentStepId },
  } = useTourInternal();
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (stepId === currentStepId) {
      setRect(elementRef.current?.getBoundingClientRect() ?? null);
    }
  }, [stepId, currentStepId, setRect]);

  return <span ref={elementRef}>{children}</span>;
};

export default Step;
