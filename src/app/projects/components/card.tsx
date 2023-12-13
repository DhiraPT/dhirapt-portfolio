interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

export const Card = ({ title, description, imageUrl }: CardProps) => {
  return (
    <div className="card">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};
