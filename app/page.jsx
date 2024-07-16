import React from "react";
import Link from "next/link";
const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">welcome</h1>
      <Link href="/properties"> show property</Link>
    </div>
  );
};

export default HomePage;
