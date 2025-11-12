import { Card } from "@/components/ui/card";
import { Step } from "@/constants";
import { PreviewStep } from "@/stepper/PreviewStep";
import { SelectCityStep } from "@/stepper/SelectCityStep";
import { SelectDatesStep } from "@/stepper/SelectDatesStep";
import { useStepperStore } from "@/stepper/store";

export function Stepper() {
  const { step } = useStepperStore();

  if (step === Step.Preview) {
    return <PreviewStep />;
  }

  return (
    <Card className="w-full">
      {step === Step.SelectCity && <SelectCityStep />}
      {step === Step.SelectDates && <SelectDatesStep />}
    </Card>
  );
}
