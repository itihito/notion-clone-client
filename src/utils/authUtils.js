import authApi from "../api/authAPI";

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const res = await authApi.verifyToken();
      return res.user;
    } catch (err) {
      return false;
    }
  },
};

export default authUtils;
