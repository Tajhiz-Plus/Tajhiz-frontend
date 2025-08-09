import React from "react";
import { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import bgImage from "assets/images/illustrations/Background.png";
import { InputAdornment, Typography } from "@mui/material";
import EmailIcon from "icons/EmailIcon";
import PasswordIcon from "icons/PasswordIcon";
import EyeIcon from "icons/EyeIcon";
import EyeOutlineIcon from "icons/EyeOutlineicon";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <IllustrationLayout
      title="تسجيل الدخول إلى حسابك"
      description=""
      illustration={bgImage}
    >
      <MDBox component="form" role="form">
        <MDBox mb={2}>
          <Typography fontSize="14px" fontWeight="400" mb="4px" color="#1E1F24">
            البريد الإلكتروني
          </Typography>

          <MDInput
            placeholder="اكتب بريدك الإلكتروني"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                "&.Mui-focused fieldset": {
                  borderColor: "#379C7C",
                  borderWidth: "1.5px",
                },
              },
            }}
          />
        </MDBox>

        <MDBox mb={2}>
          <Typography fontSize="14px" fontWeight="400" mb="4px" color="#1E1F24">
            كلمة المرور{" "}
          </Typography>
          <MDInput
            type={showPassword ? "text" : "password"}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleTogglePasswordVisibility}
                  sx={{ cursor: "pointer" }}
                >
                  {showPassword ? <EyeIcon /> : <EyeOutlineIcon />}
                </InputAdornment>
              ),
            }}
          />
        </MDBox>
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            size="large"
            fullWidth
            sx={{
              color: "#FFF",
              fontSize: "16px",
              borderRadius: "12px",
              background: "linear-gradient(90deg, #3C9D76 100%, #0097C1 100%)",
              boxShadow: "none",
              "&:hover": {
                background:
                  "linear-gradient(90deg, #3C9D76 100%, #0097C1 100%)",
                opacity: 0.9,
              },
            }}
          >
            تسجيل الدخول
          </MDButton>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default SignIn;
