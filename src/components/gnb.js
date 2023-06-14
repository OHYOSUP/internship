import { Link } from "react-router-dom";

export default function Gnb() {
  return (
    <div className="w-[80%] p-7  flex justify-around">
      <Link to={`/`}>
        <a>Home</a>
      </Link>
      <Link to={`/signin`}>
        <a>sign in</a>
      </Link>
      <Link to={`/signup`}>
        <a>sign up</a>
      </Link>
    </div>
  );
}
