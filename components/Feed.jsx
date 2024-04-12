"use client";
import { useState, useEffect } from "react";
import ThoughtCard from "./ThoughtCard";

const ThoughtCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <ThoughtCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    const filteredPosts = posts.filter((post) => {
      return (
        post.tag.includes(searchText) ||
        post.creator.userName.includes(searchText)
      );
    });
    setFilteredPosts(filteredPosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <section>
      <form className="mt-8 relative w-full flex-center">
        <input
          type="text"
          placeholder="Enter a tag or a user"
          value={searchText}
          onChange={handleSearchTextChange}
          className="search_input peer"
          required
        />
      </form>
      <ThoughtCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
      />
    </section>
  );
};

export default Feed;
