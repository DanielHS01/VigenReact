import UserForm from "@/auth/components/Signups/UserForm";
import MapImage from "@/assets/map-svgrepo-com.svg";

const UserSignup = () => {
  return (
    <div className="p-16 flex flex-col justify-center items-center md:flex-row md:justify-around md:items-start">
      <UserForm />
      <img src={MapImage} width="400px" alt="" />
    </div>
  );
};

export default UserSignup;
