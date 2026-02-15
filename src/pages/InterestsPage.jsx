import climbingImg from "../assets/interests/climbing.jpg";
import cookingImg from "../assets/interests/cooking.jpg";
import journalImg from "../assets/interests/journal.jpg";

export default function InterestsPage() {
  const interests = [
    {
      title: "Journal",
      desc: "Daily journal helps me reflect, stay organized, and track personal growth.",
      img: journalImg,
      emoji: "📓",
      since: "Oct. 2016",
    },
    {
      title: "Climbing",
      desc: "Indoor bouldering challenges both my physical strength and problem-solving mindset.",
      img: climbingImg,
      emoji: "🧗",
      since: "Oct. 2024",
    },
    {
      title: "Cooking & Bakery",
      desc: "I enjoy experimenting with recipes and recreating comforting homemade meals.",
      img: cookingImg,
      emoji: "🍳",
      since: "Oct. 2023",
    },
    {
      title: "Mystery & True Crime",
      desc: "I enjoy mystery dramas, detective novels, and true crime podcasts, which sharpen my logical thinking and analytical skills.",
      emoji: "🔍",
      since: "Jan. 2018",
    },
  ];

  return (
    <section
      id="interests"
      className="min-h-screen flex justify-center py-20 px-4"
    >
      <div className="w-full max-w-6xl">
        {/* title */}
        <div className="text-center mb-12">
          <p className="text-secondary mb-2">More About Me</p>
          <h2 className="text-4xl font-semibold text-primary">Interests</h2>
        </div>

        {/* cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {interests.map((item) => (
            <div
              key={item.title}
              className="border-2 border-primary rounded-2xl overflow-hidden
                         shadow-sm hover:shadow-md hover:-translate-y-1 transition bg-white"
            >
              {/* image */}
              {item.img ? (
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              ) : null}

              {/* content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.emoji}</span>
                  <h3 className="text-xl font-semibold text-primary">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-secondary mt-1">
                  since {item.since}
                </p>

                {/* description */}
                <p className="text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
