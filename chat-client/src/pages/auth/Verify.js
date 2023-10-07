// sections
import { Stack, Typography, Button } from "@mui/material";

import VerifyForm from "../../sections/auth/VerifyForm";
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../../redux/slices/auth";

// ----------------------------------------------------------------------

export default function LoginPage() {
  const userEmail = useSelector((state) => state.auth.email);
  const dispatch = useDispatch();
  return (
    <>
      <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>
        <Typography variant="h4">Please Verify OTP</Typography>

        <Stack direction="row" spacing={0.5} alignItems="center">
          <Typography variant="body2">Sent to email ({userEmail})</Typography>
          <Button
            variant="subtitle2"
            onClick={() => dispatch(RegisterUser({ email: userEmail }))}
          >
            Resend OTP
          </Button>
        </Stack>
      </Stack>
      {/* Form */}
      <VerifyForm />
    </>
  );
}
