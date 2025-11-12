import { format, isAfter } from "date-fns";
import { toJpeg } from "html-to-image";
import { useRef } from "react";
import { TimeList } from "@/components/time-list/TimeList";
import { Button } from "@/components/ui/button";
import { Step } from "@/constants";
import { useStepperStore } from "@/stepper/store";

const SCREENSHOT_WIDTH = 440;
const SCREENSHOT_HEIGHT = 900;

export function PreviewStep() {
  const { cities, setStep } = useStepperStore();
  const screenshotRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (!screenshotRef.current) {
      return;
    }

    toJpeg(screenshotRef.current, { quality: 1, width: SCREENSHOT_WIDTH, height: SCREENSHOT_HEIGHT }).then(
      (dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "screenshot.jpeg";
        link.click();
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-row gap-2 items-center justify-center my-5">
        <Button variant="outline" onClick={() => setStep(Step.SelectDates)}>
          Назад
        </Button>
        <Button onClick={handleClick}>Скачати</Button>
      </div>

      <div ref={screenshotRef} style={{ width: 440, height: 900 }}>
        <div
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1667339610013-020844b87990?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="h-full"
        >
          <div className="pt-14 pb-10 px-6 relative bg-black/60 rounded-lg h-full">
            <div className="text-base font-light mb-5 text-white/90">Найближчі вікночка на інʼєкції</div>

            <div className="flex flex-col gap-10">
              {cities.map(({ city, dates }) => {
                const datesArraySorted = Object.entries(dates).sort(([dateA], [dateB]) => {
                  return isAfter(new Date(dateA), new Date(dateB)) ? 1 : -1;
                });

                if (datesArraySorted.length === 0) {
                  return null;
                }

                return (
                  <div key={city.id}>
                    <div className="text-5xl font-bold mb-5 text-white">{city.name}</div>
                    <TimeList
                      items={datesArraySorted.map(([date, slots]) => ({
                        id: date,
                        date: format(date, "dd.MM"),
                        slots,
                      }))}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
