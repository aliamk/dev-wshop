import { useRouter } from "next/router";

const NavBar = () => {
  const router = useRouter();

  return (
    <div className="navbar">
      <div className="logo_container" onClick={() => router.push("/")}>
        <div className="logo">
          <img src="../../images/ON_loop_blue.gif" alt="logo" />
        </div>
        <div className="site_name">ON x Development Workshop</div>
      </div>
    </div>
  );
};

export default NavBar;
