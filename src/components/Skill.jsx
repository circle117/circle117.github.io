export default function Skill({ name, level }) {
  return (
    <div className="flex justify-items-start w-[10rem] gap-[0.5rem]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5-3.9 19.5m-2.1-19.5-3.9 19.5"
        />
      </svg>
      <div className="grid justify-items-start">
        <p className="text-l font-semibold">{name}</p>
        <p className="text-sm text-secondary">{level}</p>
      </div>
    </div>
  );
}
