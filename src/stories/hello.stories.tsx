import Step from "src/components/Step";
import Tour from "src/components/Tour";
import useTour from "src/hooks/useTour";

const Step1 = () => {
  const { next } = useTour();
  return (
    <div>
      <Step stepId="paragraph-1">
        <span>I am paragraph 1</span>
        <button onClick={next}>Next</button>
      </Step>
    </div>
  );
};

const Step2 = () => {
  const { next } = useTour();
  return (
    <div>
      <Step stepId="paragraph-2">
        <span>I am paragraph 2</span>
        <button onClick={next}>Next</button>
      </Step>
    </div>
  );
};

export const World = () => {
  return (
    <div>
      <Tour
        steps={[
          {
            stepId: "paragraph-1",
            content: "I am paragraph 1",
          },
          {
            stepId: "paragraph-2",
            content: "I am paragraph 2",
            tooltipPosition: "left",
          },
        ]}
      >
        <Step1 />
        <Step2 />
      </Tour>
    </div>
  );
};
