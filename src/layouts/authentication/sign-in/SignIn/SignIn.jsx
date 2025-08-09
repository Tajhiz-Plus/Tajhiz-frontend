import React from "react";
import { useState } from "react";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import IllustrationLayout from "layouts/authentication/components/IllustrationLayout";
import bgImage from "assets/images/illustrations/Background.png";
import { InputAdornment, TextField, Typography } from "@mui/material";
import EmailIcon from "icons/EmailIcon";
import PasswordIcon from "icons/PasswordIcon";
import EyeIcon from "icons/EyeIcon";
import EyeOutlineIcon from "icons/EyeOutlineicon";
import { useFormik } from "formik";
import { signInValidationSchema } from "./signInValidation";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function SignIn() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleTogglePasswordVisibility = () => setShowPassword((v) => !v);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: signInValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // simulate 10s delay
        await new Promise((r) => setTimeout(r, 3000));
        localStorage.setItem("user", JSON.stringify({ email: values.email }));
        navigate("/dashboard");
      } finally {
        setSubmitting(false);
      }
    },
    validateOnBlur: true,
    validateOnChange: true,
  });

  return (
    <IllustrationLayout
      title="تسجيل الدخول إلى حسابك"
      description=""
      illustration={bgImage}
    >
      <MDBox component="form" role="form" onSubmit={formik.handleSubmit}>
        <MDBox mb={2}>
          <Typography fontSize="14px" fontWeight="400" mb="4px" color="#1E1F24">
            البريد الإلكتروني
          </Typography>

          <TextField
            name="email"
            placeholder="ادخل بريدك الالكتروني"
            fullWidth
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.email && formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
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
          <TextField
            name="password"
            placeholder="ادخل كلمة المرور"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
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
        <MDBox mt={4} mb={1}>
          <MDButton
            variant="gradient"
            size="large"
            type="submit"
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
            {formik.isSubmitting ? (
              <CircularProgress
                size={24}
                sx={{
                  color: "#FFF",
                }}
              />
            ) : (
              "تسجيل الدخول"
            )}
          </MDButton>
        </MDBox>
      </MDBox>
    </IllustrationLayout>
  );
}

export default SignIn;
