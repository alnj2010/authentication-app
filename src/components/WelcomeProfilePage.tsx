import Typography from "./Typography";

export default function WelcomeProfilePage() {
  return (
    <section className="text-center pb-10">
      <div className="pb-2">
        <Typography
          variant="title2"
          className="sm:text-4xl sm:font-normal dark:text-gray-secondary"
          color="text-black"
        >
          Personal info
        </Typography>
      </div>
      <Typography
        variant="subtitle3"
        className="sm:text-lg sm:font-light dark:text-gray-secondary"
        color="text-black"
      >
        Basic info, like your name and photo
      </Typography>
    </section>
  );
}
