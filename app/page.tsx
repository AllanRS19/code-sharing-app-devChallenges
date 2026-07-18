import { appLogo } from "@/constants";
import Image from "next/image";

const Home = () => {
    return (
        <section className="relative w-full h-screen flex justify-center">
            <div
                className="absolute w-full aspect-1280/752 bg-contain bg-top md:aspect-auto md:h-[70vh] md:max-h-162.5 md:bg-cover md:bg-bottom bg-purple-brand bg-[url(/hero-background.svg)] bg-no-repeat"
            />

            <div className="w-full max-w-4xl h-full py-8 px-8 md:px-0 z-10">
                <header className="flex flex-col gap-4 items-center">
                    <Image
                        src={appLogo}
                        alt="Logo"
                        width={120}
                        height={120}
                        loading="lazy"
                        className="object-cover mb-6"
                    />
                    
                    <h1 className="text-2xl md:text-3xl font-semibold">Create & Share</h1>

                    <h2 className="text-3xl md:text-5xl font-semibold">Your Code easily</h2>
                </header>
            </div>

            {/* Editor Component */}
        </section>
    )
}

export default Home;