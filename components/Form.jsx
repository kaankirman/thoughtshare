import Link from "next/link";

const Form = ({ type, post, setPost, submit, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and Share your thoughts with the community{" "}
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Thought
          </span>
          <textarea
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
            placeholder="What's on your mind?"
            required
            className="form_textarea"
          ></textarea>
        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag {""}
            <span className="font-normal">(#product, #webdev ,#idea)</span>
          </span>
          <textarea
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          ></textarea>
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submit}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submit ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
