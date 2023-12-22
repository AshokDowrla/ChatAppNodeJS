// @mui

// import { GithubLogo, GoogleLogo, TwitterLogo } from "phosphor-react";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/slices/auth";
// ----------------------------------------------------------------------

export default function AuthSocial() {
  const { isLoading } = useSelector((state) => state.auth);

  // const handleGoogleLogin = async () => {};

  // const handleGithubLogin = async () => {};

  // const handleTwitterLogin = async () => {};
  const dispatch = useDispatch();
  const onSubmit = async () => {
    const data = {
      email: "scarmentoscoke@mailnesia.com",
      password: "demo1234",
    };
    try {
      // console.log(data);
      // submit data to backend
      dispatch(LoginUser(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {/* <Divider
        sx={{
          my: 2.5,
          typography: "overline",
          color: "text.disabled",
          "&::before, ::after": {
            borderTopStyle: "dashed",
          },
        }}
      >
        OR
      </Divider> */}

      {/* <Stack direction="row" justifyContent="center" spacing={2}> */}
      {/* <IconButton onClick={handleGoogleLogin}>
          <GoogleLogo color="#DF3E30" />
        </IconButton>

        <IconButton color="inherit" onClick={handleGithubLogin}>
          <GithubLogo />
        </IconButton>

        <IconButton onClick={handleTwitterLogin}>
          <TwitterLogo color="#1C9CEA" />
        </IconButton> */}

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
        onClick={onSubmit}
      >
        Guest Login
      </LoadingButton>
      {/* </Stack> */}
    </div>
  );
}
