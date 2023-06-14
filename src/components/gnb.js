import { Link } from "react-router-dom";

export default function Gnb() {
  return (
    <div className="w-[80%] p-7  flex justify-around">
      <Link to={`${process.env.PUBLIC_URL}/`}>
        <a>Home</a>
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/signin`}>
        <a>sign in</a>
      </Link>
      <Link to={`${process.env.PUBLIC_URL}/signup`}>
        <a>sign up</a>
      </Link>
    </div>
  );
}
