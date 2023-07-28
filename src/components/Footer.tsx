import Typography from "./Typography";

export default function Footer() {
  return (
    <>
      <footer className="flex justify-between font-normal text-sm">
        <Typography variant="body2" color="gray">
          create by{" "}
          <span className="font-semibold text-sm underline">alnj2010</span>
        </Typography>
        <Typography variant="body2" color="gray">
          devChallenge.io
        </Typography>
      </footer>
    </>
  );
}
