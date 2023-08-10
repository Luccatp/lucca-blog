import { Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/sanityImageUrl";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ChevronLeft, CornerUpLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface pageProps {
  params: {
    slug: string;
  };
}

const getData = async (slug: string) => {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
  const data = await client.fetch(query);
  return data;
};

const page: FC<pageProps> = async ({ params }) => {
  const data = (await getData(params.slug)) as Post;
  const portableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="Image"
          className="rounded-lg"
          width={800}
          height={800}
        />
      ),
    },
  };
  return (
    <div className="md:divide-y md:divide-gray-200 md:dark:divide-gray-700">
      <header className="pt-6 xl:pb-6">
        <div className="space-y-1 text-center">
          <div className="space-y-10">
            <div className="relative">
              <Link href="/" className="absolute left-0 -top-2 md:-top-1">
                <CornerUpLeft className="w-10 h-10 text-gray-500 dark:text-gray-300" />
              </Link>
              <p className="text-base font-medium leading-6 text-teal-500">
                {new Date(data._createdAt)
                  .toISOString()
                  .split("T")[0]
                  .split("-")
                  .reverse()
                  .join("/")}
              </p>
            </div>

            <div>
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                {data.title}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="divide-y divide-gray-200 pb-7 dark:divide-gray-700 xl:divide-y-0">
        <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
          <div className="prose max-w-none break-words pb-8 pt-10 dark:prose-invert prose-lg">
            <PortableText
              value={data.content}
              components={portableTextComponent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
