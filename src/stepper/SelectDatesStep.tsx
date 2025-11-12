import { addMonths, format, getDaysInMonth, isBefore, startOfDay, startOfMonth } from "date-fns";
import { uk } from "date-fns/locale";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Step, TIME_SLOTS } from "@/constants";
import { cn } from "@/lib/utils";
import { useStepperStore } from "@/stepper/store";

export function getNextThreeMonths(): Date[] {
  const now = new Date();
  return [0, 1, 2].map((i) => startOfMonth(addMonths(now, i)));
}

export function getDaysForMonth(date: Date): Date[] {
  const today = startOfDay(new Date());
  const daysInMonth = getDaysInMonth(date);
  const start = startOfMonth(date);

  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = new Date(start);
    day.setDate(i + 1);
    return day;
  }).filter((day) => !isBefore(startOfDay(day), today));
}

const months = getNextThreeMonths();

export function SelectDatesStep() {
  const { setStep, cities, toggleDate, toggleTimeSlot } = useStepperStore();
  const [selectedMonth, setSelectedMonth] = useState<Date>(months[0]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const dates = useMemo(() => getDaysForMonth(selectedMonth), [selectedMonth]);

  return (
    <>
      <CardHeader className="flex items-center gap-2">
        <div className="text-2xl font-bold">Оберіть дати: </div>

        <Select
          value={selectedCity.city.id}
          onValueChange={(value) => setSelectedCity(cities.find(({ city }) => city.id === value)!)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            {cities.map(({ city }) => (
              <SelectItem key={city.id} value={city.id}>
                {city.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3 mb-3">
          {months.map((month) => (
            <div key={month.toString()} className="flex flex-col gap-3">
              <Button
                className="text-md font-normal capitalize"
                variant={selectedMonth === month ? "default" : "outline"}
                onClick={() => setSelectedMonth(month)}
              >
                {format(new Date(month), "LLLL", { locale: uk })}
              </Button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          {dates.map((date) => {
            const dateString = date.toString();
            const isSelected = !!selectedCity.dates[dateString];

            return (
              <div
                key={date.toString()}
                className={cn("p-3", isSelected && "bg-gray-50 border border-gray-200 rounded-md")}
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={date.toString()}
                    checked={isSelected}
                    onCheckedChange={() => toggleDate(selectedCity.city, dateString)}
                  />
                  <Label className="text-md font-normal" htmlFor={date.toString()}>
                    {format(new Date(date), "dd.MM")}
                  </Label>
                </div>

                {isSelected && (
                  <div className="flex flex-wrap gap-3 mt-3 mb-3">
                    {TIME_SLOTS.map((slot) => {
                      return (
                        <div
                          onClick={() => toggleTimeSlot(selectedCity.city, dateString, slot)}
                          key={slot}
                          className="flex flex-1/4 items-center gap-2 py-1"
                        >
                          <Checkbox checked={selectedCity.dates[dateString]?.includes(slot)} />
                          <div className="text-sm font-normal">{slot}</div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-2 w-full">
          <Button className="flex-1" variant="outline" onClick={() => setStep(Step.SelectCity)}>
            Назад
          </Button>

          <Button className="flex-1" onClick={() => setStep(Step.Preview)}>
            Наступний крок
          </Button>
        </div>
      </CardFooter>
    </>
  );
}
