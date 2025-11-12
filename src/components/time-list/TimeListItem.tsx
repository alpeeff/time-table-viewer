import type { TimeListItemType, TimeSlotType } from "@/components/time-list/TimeList.types";

type Props = {
  item: TimeListItemType;
};

export function TimeListItem({ item }: Props) {
  return (
    <div className="flex gap-2">
      <div className="flex items-center px-3 py-1.5 bg-white/20 text-white font-medium tabular-nums">{item.date}</div>

      <div className="flex flex-row gap-2 py-1 flex-wrap">
        {item.slots.map((slot) => (
          <TimeSlotItem key={slot} slot={slot} />
        ))}
      </div>
    </div>
  );
}

function TimeSlotItem({ slot }: { slot: TimeSlotType }) {
  return (
    <div className="flex items-center gap-1">
      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
      <div className="text-sm text-white font-light tabular-nums">{slot}</div>
    </div>
  );
}
