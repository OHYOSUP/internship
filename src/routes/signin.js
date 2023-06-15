import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient, apiJSONInstance } from "../apis/utils/instance";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // 에러메시지
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  // 유효성 확인
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("access_token");

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    if (!email.includes("@")) {
      setIsEmail(false);
      setEmailErr("이메일에는 @이 들어가야합니다");
    } else {
      setIsEmail(true);
      setEmailErr("");
    }
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
    if (password.length < 8) {
      setIsPassword(false);
      setPasswordErr("비밀번호는 8자리 이상입니다");
    } else {
      setIsPassword(true);
      setPasswordErr("");
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await apiJSONInstance.post("auth/signin", {
        email: email,
        password: password,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data}`;
      localStorage.setItem("access_token", `Bearer ${res.data.access_token}`);
      if (res.status === 200) {
        navigate("/todo");
      }
      return res.data;
    } catch (err) {
      console.error(err);
      alert(err.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      alert("이미 로그인 하셨습니다");
      navigate("/todo");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1 className="text-center font-extrabold text-lg mt-10">로그인</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 mt-10 ">
        <label htmlFor="email" className="text-left" />
        이메일 <br />
        <input
          placeholder="이메일을 입력하세요"
          data-testid="email-input"
          type="email"
          value={email}
          onChange={onChangeEmail}
          className="w-80 p-3 rounded-md border border-black"
        />
        {emailErr && <p>{emailErr}</p>}
        <label htmlFor="password" />
        비밀번호 <br />
        <input
          placeholder="비밀번호를 입력하세요"
          data-testid="password-input"
          type="password"
          minLength={8}
          value={password}
          onChange={onChangePassword}
          className="w-80 p-3 rounded-md border border-black"
        />
        {passwordErr && <p>{passwordErr}</p>}
        <button
          data-testid="signin-button"
          className="bg-[#1D9BF0] w-30 rounded-md p-4 text-white font-bold"
          disabled={!(isEmail && isPassword)}
        >
          로그인
        </button>
      </form>
    </div>
  );
}
