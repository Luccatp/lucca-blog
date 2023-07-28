import Filter from "@/components/Filter";
import Navbar from "@/components/Navbar";
import BlogPosts from "@/components/BlogPosts";
import { FilterInterface, Post } from "@/lib/interface";
import { client } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

const getBlogPosts = async () => {
  const query = '*[_type == "post"]';
  const data = await client.fetch(query);
  return data;
};

const getFilters = async () => {
  const query = '*[_type == "category"]';
  const data = await client.fetch(query);
  return data;
};

export default async function Home() {
  const blogPosts = (await getBlogPosts()) as Post[];
  const filters = (await getFilters()) as FilterInterface[];
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          All Posts
        </h1>
        <ul className="flex gap-4">
          {filters.map((item, index) => (
            <li key={index}>
              <Filter item={item} />
            </li>
          ))}
        </ul>
      </div>
      <BlogPosts blogPosts={blogPosts} />
    </div>
  );
}
