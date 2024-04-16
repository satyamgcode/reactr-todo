import { useNavigation } from "react-router-dom";
import { authStart, authSuccess, authFailure } from "../userSlice";
import { api } from "../../api";

export const signUp = (userData) => async (dispatch) => {
  try {
    dispatch(authStart());

    await api.post("/register", userData);
    alert("Account created successfully. Please login to continue.");
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

export const signIn = (credentials) => async (dispatch) => {
  const navigate = useNavigation();
  try {
    dispatch(authStart());
    // Simulate asynchronous sign-in process, e.g., making API call
    const user = await api.post("/login", credentials);
    dispatch(authSuccess(user));

    // navigate to the home page
    navigate("/");
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};
