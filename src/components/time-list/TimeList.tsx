import type { TimeListItemType } from "@/components/time-list/TimeList.types";
import { TimeListItem } from "@/components/time-list/TimeListItem";

type Props = {
  items: TimeListItemType[];
};

export function TimeList({ items }: Props) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item) => (
        <TimeListItem key={item.id} item={item} />
      ))}
    </div>
  );
}
