import Typography from "./Typography";
type Props = {
  title: string;
  subtitle: string;
};
export default function SectionInfo({ title, subtitle }: Props) {
  return (
    <div>
      <div className="pb-1">
        <Typography variant="title2" color="text-black">
          {title}
        </Typography>
      </div>
      <Typography variant="subtitle4" color="text-gray">
        {subtitle}
      </Typography>
    </div>
  );
}
