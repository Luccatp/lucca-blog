import { Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Link from "next/link";
import { groq } from "next-sanity";

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";
const { signal } = new AbortController();

const getData = async () => {
  const query = '*[_type == "post"]';
  const data = await client.fetch(groq`${query}`, {
    signal,
    cache: "no-store",
  });
  return data;
};

export default async function Home() {
  const data = (await getData()) as Post[];
  const sortedData = data.sort((a, b) => {
    return new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime();
  });
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>
      </div>
      <ul>
        {sortedData.map((post) => (
          <li key={post._id} className="py-4">
            <article className="relative space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
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

                <div className="group">
                  <p className="prose max-w-none line-clamp-3 text-gray-500 dark:text-gray-400">
                    {post.overview}
                  </p>
                  <span className="pointer-events-none z-50 rounded-2xl p-4 bg-teal-200 dark:bg-teal-950 absolute top-full left-0 opacity-0 transition-opacity group-hover:opacity-100 group-hover:duration-700 group-hover:delay-300">
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
