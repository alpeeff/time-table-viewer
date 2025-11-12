import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CITIES, Step } from "@/constants";
import { useStepperStore } from "@/stepper/store";

export function SelectCityStep() {
  const { cities, setStep, toggleCity } = useStepperStore();

  return (
    <>
      <CardHeader className="text-2xl font-bold">Оберіть місто</CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {CITIES.map((city) => (
            <div className="flex items-center space-x-2" key={city.id}>
              <Checkbox
                checked={cities.some((c) => c.city.id === city.id)}
                onCheckedChange={() => toggleCity(city)}
                id={city.id}
              />
              <Label htmlFor={city.id} className="text-md font-normal">
                {city.name}
              </Label>
            </div>
          ))}
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full" onClick={() => setStep(Step.SelectDates)}>
          Далі
        </Button>
      </CardFooter>
    </>
  );
}
