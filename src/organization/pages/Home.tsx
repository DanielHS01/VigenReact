import Welcome from "@/organization/components/Welcome/Welcome";
import Active from "@/organization/components/Notifications/Active";
import Progress from "@/organization/components/Notifications/Progress";

const Home = () => {
  return (
    <>
      <Welcome />
      <Active />
      <Progress />
    </>
  );
};

export default Home;
