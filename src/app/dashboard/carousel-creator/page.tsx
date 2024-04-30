import MobileSideBarHeader from "@/components/Sidebar/MobileSidebarHeader";

export default function CarouselCreator() {
  return (
    <div className="pt-4 px-2 xs:px-4">
      <MobileSideBarHeader />
      <main className="relative flex flex-col justify-center items-center h-[90vh]">
        <span className="text-xl font-medium">Carousel Creator is</span>
        <span className="text-2xl text-center font-semibold xs:text-3xl md:text-4xl">
          Coming soon...
        </span>
      </main>
    </div>
  );
}
