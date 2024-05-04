interface ExperienceCardProps {
  key: React.Key;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export const ExperienceCard = ({
  title,
  company,
  startDate,
  endDate,
  description,
}: ExperienceCardProps) => {
  return (
    <li className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
      <p className="font-semibold text-zinc-900">{company}</p>
      <p className="font-semibold text-zinc-900">
        {startDate} - {endDate}
      </p>
      <ul>
        {description.map((desc: String, index) => (
          <li key={index} className="text-zinc-900">
            &#8226; {desc}
          </li>
        ))}
      </ul>
    </li>
  );
};
