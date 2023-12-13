interface CardProps {
  title: String;
  company: String;
  startDate: String;
  endDate: String;
  description: String[];
}

export const Card = ({
  title,
  company,
  startDate,
  endDate,
  description,
}: CardProps) => {
  return (
    <li className="text font-bold">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500">{company}</p>
        <p className="text-gray-500">
          {startDate} - {endDate}
        </p>
        {description.map((desc: String) => (
          <p className="text-gray-500">{desc}</p>
        ))}
      </div>
    </li>
  );
};
