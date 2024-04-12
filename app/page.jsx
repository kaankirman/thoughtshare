import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Discover & Share
        <br className="max-md:hidden" />
        <span className="blue_gradient text-center">
          Thoughts, ideas or literally anything you like
        </span>
      </h1>
      <p className="desc text-center">
        Thoughtshare is an open-source platform where you can share your
        thoughts, ideas, or literally anything you like with the world. It's a
        place where you can discover what other people are thinking about and
        share your thoughts with them.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
