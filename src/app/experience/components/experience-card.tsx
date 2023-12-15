interface ExperienceCardProps {
  key: React.Key;
  title: String;
  company: String;
  startDate: String;
  endDate: String;
  description: String[];
}

export const ExperienceCard = ({
  title,
  company,
  startDate,
  endDate,
  description,
}: ExperienceCardProps) => {
  return (
    <li className="text font-bold">
      <div className="rounded-lg bg-slate-100 p-6 shadow-md">
        <h2 className="text-2xl font-bold text-zinc-900">{title}</h2>
        <p className="text-zinc-900">{company}</p>
        <p className="text-zinc-900">
          {startDate} - {endDate}
        </p>
        {description.map((desc: String, index) => (
          <p key={index} className="text-zinc-900">
            {desc}
          </p>
        ))}
      </div>
    </li>
  );
};
