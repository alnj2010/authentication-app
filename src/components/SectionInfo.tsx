import Typography from "./Typography";
type Props = {
  title: string;
  subtitle: string;
};
export default function SectionInfo({ title, subtitle }: Props) {
  return (
    <div>
      <div className="pb-1">
        <Typography
          variant="title2"
          color="text-black"
          className="dark:text-gray-secondary"
        >
          {title}
        </Typography>
      </div>
      <Typography
        variant="subtitle4"
        color="text-gray"
        className="dark:text-gray-secondary"
      >
        {subtitle}
      </Typography>
    </div>
  );
}
