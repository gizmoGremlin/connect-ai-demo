import { Truck } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-brand text-brand-foreground">
      <div className="mx-auto flex h-8 max-w-6xl items-center justify-center gap-2 px-4 text-[12px] font-medium">
        <Truck className="h-3.5 w-3.5" strokeWidth={2.25} />
        <span className="tracking-wide">
          Ships with every iPhone 15 &amp; 16
          <span className="mx-2 opacity-60">&middot;</span>
          Free shipping on early orders
          <span className="mx-2 opacity-60">&middot;</span>
          30-day returns
        </span>
      </div>
    </div>
  );
}
