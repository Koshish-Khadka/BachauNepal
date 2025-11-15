// "use client";

// import Sidebar from "@/components/Sidebar";
// import dynamic from "next/dynamic";

// const Map = dynamic(() => import("@/components/Map"), {
//   ssr: false,
// });

// export default function Home() {
//   return (
//     <div className="h-screen">
//       <Map/>
//       <Sidebar/>
//     </div>
//   );
// }
"use client";

import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <Map />
      <Navbar />
      <Sidebar />
      <Filter />
    </div>
  );
}
