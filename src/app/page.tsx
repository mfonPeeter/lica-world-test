import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="md:hidden">
        <div className="absolute top-4 left-3 z-20">
          <Link href="/">
            <Image src="/logo.webp" alt="Logo" width="170" height="170" />
          </Link>
        </div>
      </header>
      <main className="flex flex-col-reverse text-black/80 md:flex-row md:h-screen">
        <section className="w-full pt-12 md:h-screen md:pt-0">
          <div className="hidden w-auto mb-10 p-4 md:block lg:mb-14">
            <Link href="/" className="inline-block">
              <Image src="/logo.webp" alt="Logo" width="170" height="170" />
            </Link>
          </div>
          <div className="px-3 pb-6 xs:px-6 md:pb-2 lg:px-10">
            <h1 className="mb-3 text-2xl font-semibold xs:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
              Your LinkedIn Growth companion
            </h1>
            <p className="mb-5 text-lg">
              Grow your personal brand on LinkedIn with:
            </p>
            <ul className="flex flex-col space-y-2 mb-7">
              <li className="flex space-x-1">
                <Image
                  src="/svg/check-circle.svg"
                  alt="Check Circle"
                  width="17"
                  height="17"
                />
                <span>Efficient Scheduling</span>
              </li>
              <li className="flex space-x-1">
                <Image
                  src="/svg/check-circle.svg"
                  alt="Check Circle"
                  width="17"
                  height="17"
                />
                <span>Native AI Grammar Check</span>
              </li>
              <li className="flex space-x-1">
                <Image
                  src="/svg/check-circle.svg"
                  alt="Check Circle"
                  width="17"
                  height="17"
                />
                <span>Draft, schedule & publish</span>
              </li>
              <li className="flex space-x-1">
                <Image
                  src="/svg/disabled-check-circle.svg"
                  alt="Check Circle"
                  width="17"
                  height="17"
                />
                <span className="text-gray-400">More features coming soon</span>
              </li>
            </ul>
            <Link
              href="/sign-up"
              className="inline-block px-3 py-2.5 mb-1 bg-purple-900 text-white rounded-md transition-colors hover:bg-purple-900/80"
            >
              Connect your LinkedIn account
            </Link>
            <p className="text-sm font-medium">
              Already have an account?{" "}
              <span>
                <Link
                  className="inline-block text-purple-900 transition-colors hover:text-purple-900/80"
                  href="/sign-in"
                >
                  Log in instead
                </Link>
              </span>
            </p>
          </div>
        </section>
        <section className="relative w-full md:h-screen">
          <div className="bg-[url('../../public/linkedIn-img.jpeg')] bg-cover bg-no-repeat bg-right-top w-full h-[300px] before:content-[''] before:absolute before:inset-0 before:block before:bg-gradient-to-r before:from-black before:to-purple-500 before:opacity-40 before:z-10 xs:h-[400px] md:h-screen" />
        </section>
      </main>
    </>
  );
}
