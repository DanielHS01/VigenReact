import UserForm from "@/auth/components/Signups/UserForm";
import UsersMap from "@/auth/components/Maps/UsersMap";

const UserSignup = () => {
  return (
    <div className="p-16 flex flex-col justify-center space-y-10 md:space-y-0 items-center md:flex-row md:justify-center md:items-start md:gap-32">
      <UserForm />
      <UsersMap />
    </div>
  );
};

export default UserSignup;
