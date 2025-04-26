import { actions } from "astro:actions";
import { useRef, useState } from "preact/hooks";

interface Props {
  initialCount: number;
  postSlug: string;
}

const LikeCounterButton = ({ initialCount, postSlug }: Props) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    if (!isAnimating && buttonRef.current) {
      setIsAnimating(true);
      // Add a class to the button to trigger the animation
      buttonRef.current.classList.remove(
        "hover:scale-105",
        "hover:bg-gray-300/90"
      );
      buttonRef.current.classList.add("scale-110");
      // Reset the class after the animation
      setTimeout(() => {
        buttonRef.current?.classList.remove("scale-110");
        buttonRef.current?.classList.add(
          "hover:scale-105",
          "hover:bg-gray-300/90"
        );
        // Reset the animation state
        setIsAnimating(false);
      }, 150);
      // Increment the count
      setCount((prev) => prev + 1);
      // Call the likePost action
      actions.likePost({ postSlug });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        aria-label="Like this post"
        type="button"
        className="aspect-square cursor-pointer rounded-full border border-gray-300 p-8 text-8xl transition-all hover:scale-105 hover:bg-gray-300/90 dark:border-gray-700 dark:hover:bg-gray-100/10"
        ref={buttonRef}
        onClick={handleClick}
      >
        👍
      </button>
      <span className="text-gray-500 dark:text-gray-400">{count}</span>
    </div>
  );
};

export default LikeCounterButton;
