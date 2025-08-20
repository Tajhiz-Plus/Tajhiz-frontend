import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useAddRole } from "services/mutations/roles/useAddRole";
import { useAddUser } from "services/mutations/users/useAddUser";

const validationSchema = yup.object({
  fullName: yup
    .string()
    .required("الاسم مطلوب")
    .min(4, "الاسم يجب أن يكون على الأقل 4 حروف"),
  email: yup
    .string()
    .required("البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح"),
  password: yup
    .string()
    .required("كلمة المرور مطلوبة")
    .min(8, "كلمة المرور يجب أن تكون 8 أحرف على الأقل")
    .max(128, "كلمة المرور يجب ألا تتجاوز 128 حرف")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,128}$/,
      "كلمة المرور يجب أن تحتوي على حرف صغير، حرف كبير ورقم"
    ),
});

export default function AddNewUserDialog({ open, onClose }) {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleAdd(values);
    },
    validateOnBlur: true,
    validateOnChange: false,
  });

  const { mutate: addUserMutation, isPending: isAddLoading } = useAddUser({
    onSuccess: () => {
      toast.success("تم إضافة مستخدم بنجاح");
      formik.resetForm();
      onClose();
    },
    onError: (error) => {
      toast.error(`حدث خطأ: ${error.response.data.message}`);
    },
  });

  const handleAdd = (payload) => {
    addUserMutation({ payload });
  };

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>إضافة مستخدم جديد</DialogTitle>

      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="الإسم بالكامل"
              name="fullName"
              placeholder="ادخل اسم المستخدم "
              value={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.fullName && formik.errors.fullName)}
              helperText={formik.touched.fullName && formik.errors.fullName}
              fullWidth
            />

            <TextField
              label="البرد الإلكتروني"
              name="email"
              placeholder="ادخل البريد الإلكتروني"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />

            <TextField
              label="كلمة المرور"
              name="password"
              placeholder="ادخل كلمة المرور"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.password && formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              fullWidth
            />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isAddLoading}>
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "#FFF" }}
            disableElevation
            disabled={isAddLoading || !formik.dirty}
          >
            {isAddLoading ? (
              <CircularProgress
                size={22}
                sx={{
                  color: "#000",
                }}
              />
            ) : (
              "إضافة"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
