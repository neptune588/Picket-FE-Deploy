import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { postData } from "@/services/api";

//endpoint auth/login
export default function useSignIn() {
  const navigate = useNavigate();
  useEffect(() => {
    const condition = localStorage.getItem("userAccessToken");
    if (condition) {
      navigate("/");
    }
  }, []);

  const [errors, setErrors] = useState({
    emailInvaildNotice: "",
    pwInvaildNotice: "",

    userEmailMsg: "",
    userPwMsg: "",

    submitErrorMsg: "",
  });
  const [values, setValues] = useState({
    userLoginEmail: "",
    userLoginPassword: "",
  });
  const [submitLoading, setSubmitLoading] = useState(false);

  const { isPending, mutate } = useMutation({
    mutationFn: async (userData) => {
      return await postData("auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onMutate: () => {
      //중복로그인 막기위한 2중장치 useEffect 로 되돌리기 + undefined return
      const condition = localStorage.getItem("userAccessToken");
      if (condition) {
        return;
      }
    },
    //성공시
    onSuccess: (JWT) => {
      const { data: tokenData } = JWT;
      //console.log(tokenData);
      //localstroge는 오직 문자열 형태의 key,value만 가능하다.
      localStorage.setItem(
        "userAccessToken",
        JSON.stringify(tokenData.accessToken)
      );
      localStorage.setItem(
        "userRefreshToken",
        JSON.stringify(tokenData.refreshToken)
      );
      localStorage.setItem("userId", JSON.stringify(tokenData.memberId));
      localStorage.setItem("userNickname", JSON.stringify(tokenData.nickname));
      localStorage.setItem("userAvatar", JSON.stringify(tokenData.profileUrl));
      setValues({ userLoginEmail: "", userLoginPassword: "" });
      setErrors({
        emailInvaildNotice: "",
        pwInvaildNotice: "",

        userEmailMsg: "",
        userPwMsg: "",

        submitErrorMsg: "",
      });

      navigate("/");
    },

    onError: (error) => {
      if (error.response.status === 401) {
        setErrors({
          ...errors,
          submitErrorMsg:
            "존재하지 않는 회원입니다. 이메일과 비밀번호를 확인 해주세요.",
        });
      }
    },
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    setErrors({
      emailInvaildNotice: "default",
      pwInvaildNotice: "default",

      userEmailMsg: "",
      userPwMsg: "",
      submitErrorMsg: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (submitLoading) {
      return;
    }
    setSubmitLoading(true);

    if (values.userLoginEmail === "") {
      setErrors({
        ...values,
        emailInvaildNotice: "inVaild",
        userEmailMsg: "이메일을 입력 해주세요.",
      });
      setSubmitLoading(false);
      return;
    } else if (values.userLoginPassword === "") {
      setErrors({
        ...values,
        pwInvaildNotice: "inVaild",
        userPwMsg: "비밀번호를 입력 해주세요.",
      });
      setSubmitLoading(false);
      return;
    } else {
      const dataRefine = JSON.stringify({
        email: values.userLoginEmail,
        password: values.userLoginPassword,
      });

      mutate(dataRefine);

      setSubmitLoading(false);
      return;
    }
  };

  return { errors, values, isPending, handleSubmit, handleChange };
}
