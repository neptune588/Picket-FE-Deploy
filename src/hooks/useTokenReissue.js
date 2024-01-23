import { postData } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export default function useTokenReissue() {
  const tokenRequest = useMutation({
    mutationFn: async () => {
      const token = JSON.parse(localStorage.getItem("userAccessToken"));
      const refreshToken = JSON.parse(localStorage.getItem("userRefreshToken"));

      const tokenData = JSON.stringify({
        accessToken: token,
        refreshToken: refreshToken,
      });
      return await postData("auth/reissue", tokenData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    onSuccess: async (res) => {
      localStorage.setItem(
        "userAccessToken",
        JSON.stringify(res.data.accessToken)
      );
      localStorage.setItem(
        "userRefreshToken",
        JSON.stringify(res.data.refreshToken)
      );
      console.log("로그인 연장 성공");
    },
    onError: (error) => {
      console.error("error발생", error);
    },
  });

  return { tokenRequest };
}
