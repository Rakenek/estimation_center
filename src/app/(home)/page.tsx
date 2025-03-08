import ExploreButton from "@/components/ExploreButton";

export default function Home() {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/duv2kieyz/image/upload/v1740347920/my-nextjs-project/p3xp2eirzfvh4yaermjh.webp')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="py-6 text-4xl font-bold animate-moveInFromRight">
          Estimation Center
        </h1>
        <ExploreButton />
      </div>
    </div>
  );
}
