import Navbar from "@/components/Navbar";
import { Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const query = '*[_type == "post"]';
  const data = await client.fetch(query);
  return data;
};

export default async function Home() {
  const data = (await getData()) as Post[];
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      <ul>
        {data.map((post) => (
          <li key={post._id} className="py-4">
            <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
              <div>
                <p className="text-base font-medium leading-6 text-teal-500">
                  {new Date(post._createdAt)
                    .toISOString()
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join("/")}
                </p>
              </div>
              <Link
                href={`/post/${post.slug.current}`}
                prefetch
                className="space-y-3 xl:col-span-3"
              >
                <div>
                  <h3 className="text-3xl font-bold leading-8 tracking-tight text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h3>
                </div>

                <div className="group relative w-max">
                  <p className="prose max-w-none line-clamp-3 text-gray-500 dark:text-gray-400">
                    {post.overview}
                  </p>
                  <span className="pointer-events-none rounded-2xl p-4 bg-teal-200 dark:bg-teal-950 absolute top-10 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100 group-hover:duration-700 group-hover:delay-300">
                    {post.overview}
                  </span>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
