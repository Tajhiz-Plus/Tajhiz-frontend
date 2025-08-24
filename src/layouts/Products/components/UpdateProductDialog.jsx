import React, { useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  CircularProgress,
  MenuItem,
  FormControlLabel,
  Switch,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import SearchSelect from "components/SearchSelect/SearchSelect";
import { colorsSelect } from "constants/constants";
import { useFetchCategories } from "services/queries/categories/useFetchCategories";
import { useFetchSubcategories } from "services/queries/categories/useFetchCategories";
import { updateProductSchema } from "./validation";
import { useUpdateProduct } from "services/mutations/products/useUpdateProduct";

const MAX_IMAGES = 3;
const IMG_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

export default function UpdateProductDialog({ open, onClose, product }) {
  const { mutate: updateProduct, isPending } = useUpdateProduct({
    onSuccess: () => {
      toast.success("تم تعديل المنتج بنجاح");
      formik.resetForm();
      onClose?.();
    },
    onError: (error) => {
      const msg =
        error?.response?.data?.message || error?.message || "حدث خطأ غير متوقع";
      toast.error(`حدث خطأ: ${msg}`);
    },
  });

  const { data: categoriesData, isLoading: categoriesLoading } =
    useFetchCategories();

  const { data: SubcategoriesData, isLoading: SubcategoriesLoading } =
    useFetchSubcategories();

  const categories = useMemo(() => {
    return categoriesData?.data?.categories || [];
  }, [categoriesData]);

  const subCategoryOptions = useMemo(() => {
    return SubcategoriesData?.data || [];
  }, [SubcategoriesData]);

  const selectedColors = colorsSelect.filter((c) =>
    product.colors.includes(c.value)
  );
  const formik = useFormik({
    initialValues: {
      nameEn: product?.nameEn || "",
      nameAr: product?.nameAr || "",
      descriptionEn: product?.descriptionEn || "",
      descriptionAr: product?.descriptionAr || "",
      price: product?.price || "",
      discountPrice: product?.discountPrice || "",
      colors: selectedColors.length > 0 ? selectedColors : [],
      hasDelivery: product?.hasDelivery || false,
      hasInstallation: product?.hasInstallation || false,
      isActive: product?.isActive || false,
      isFeatured: product?.isFeatured || false,
      tags: product?.tags.join(", ") || "",
      categoryId: product?.categoryId || "",
      subCategoryId: product?.subCategoryId || "",
      images: [],
    },
    enableReinitialize: true,
    validationSchema: updateProductSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values) => {
      const fd = new FormData();
      fd.append("nameEn", values.nameEn);
      fd.append("nameAr", values.nameAr);
      fd.append("descriptionEn", values.descriptionEn || "");
      fd.append("descriptionAr", values.descriptionAr || "");
      fd.append("price", Number(values.price));
      if (values.discountPrice !== "" && values.discountPrice !== null) {
        fd.append("discountPrice", Number(values.discountPrice));
      }

      const colorsCSV = values.colors.map((c) => c.value).join(",");
      fd.append("colors", colorsCSV);

      fd.append("hasDelivery", String(values.hasDelivery));
      fd.append("hasInstallation", String(values.hasInstallation));
      fd.append("isActive", String(values.isActive));
      fd.append("isFeatured", String(values.isFeatured));

      fd.append("tags", values.tags);

      fd.append("categoryId", String(values.categoryId));
      if (values.subCategoryId) {
        fd.append("subCategoryId", String(values.subCategoryId));
      }

      (values.images || []).slice(0, MAX_IMAGES).forEach((file) => {
        fd.append("images", file);
      });

      updateProduct({ payload: fd, id: product.id });
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose?.();
  };

  const filteredSubcategories = useMemo(() => {
    const catId = Number(formik.values.categoryId || 0);
    if (!catId) return [];
    return (subCategoryOptions || []).filter(
      (sc) => Number(sc.categoryId) === catId
    );
  }, [formik.values.categoryId, subCategoryOptions]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>تعديل منتج </DialogTitle>

      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="اسم المنتج (بالإنجليزية)"
              name="nameEn"
              placeholder="Office Chair"
              value={formik.values.nameEn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.nameEn && formik.errors.nameEn)}
              helperText={formik.touched.nameEn && formik.errors.nameEn}
              fullWidth
            />

            <TextField
              label="اسم المنتج (بالعربية)"
              name="nameAr"
              placeholder="كرسي مكتب"
              value={formik.values.nameAr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.nameAr && formik.errors.nameAr)}
              helperText={formik.touched.nameAr && formik.errors.nameAr}
              fullWidth
            />

            <TextField
              label="الوصف (EN)"
              name="descriptionEn"
              placeholder="Detailed English description"
              value={formik.values.descriptionEn}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.descriptionEn && formik.errors.descriptionEn
              )}
              helperText={
                formik.touched.descriptionEn && formik.errors.descriptionEn
              }
              fullWidth
              multiline
              minRows={2}
            />

            <TextField
              label="الوصف (AR)"
              name="descriptionAr"
              placeholder="وصف عربي تفصيلي"
              value={formik.values.descriptionAr}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.descriptionAr && formik.errors.descriptionAr
              )}
              helperText={
                formik.touched.descriptionAr && formik.errors.descriptionAr
              }
              fullWidth
              multiline
              minRows={2}
            />

            <Stack direction="row" spacing={2}>
              <TextField
                label="السعر (SAR)"
                name="price"
                type="number"
                inputProps={{ min: 0, step: "0.01" }}
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.price && formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                fullWidth
              />

              <TextField
                label="سعر الخصم (SAR)"
                name="discountPrice"
                type="number"
                inputProps={{ min: 0, step: "0.01" }}
                value={formik.values.discountPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.discountPrice && formik.errors.discountPrice
                )}
                helperText={
                  formik.touched.discountPrice && formik.errors.discountPrice
                }
                fullWidth
              />
            </Stack>

            <SearchSelect
              label="الألوان"
              options={colorsSelect || []}
              placeholder="اختر الألوان"
              name="colors"
              multiple
              value={formik.values.colors}
              onChange={(arr) => formik.setFieldValue("colors", arr || [])}
              error={formik.touched.colors && formik.errors.colors}
              helperText={formik.touched.colors && formik.errors.colors}
            />

            <TextField
              label="الخصائص"
              name="tags"
              placeholder="office, chair, ergonomic"
              value={formik.values.tags}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.tags && formik.errors.tags)}
              helperText={formik.touched.tags && formik.errors.tags}
              fullWidth
            />

            <TextField
              select
              label="القسم"
              name="categoryId"
              value={formik.values.categoryId ?? ""}
              disabled={categoriesLoading}
              onChange={(e) =>
                formik.setFieldValue("categoryId", Number(e.target.value))
              }
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.categoryId && formik.errors.categoryId
              )}
              helperText={formik.touched.categoryId && formik.errors.categoryId}
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { padding: "0.7rem 0rem" } }}
            >
              {(categories ?? []).map((o) => (
                <MenuItem key={o.id} value={Number(o.id)}>
                  {o.nameAr}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="القسم الفرعي (اختياري)"
              name="subCategoryId"
              value={formik.values.subCategoryId ?? ""}
              onChange={(e) => {
                const v = e.target.value;
                formik.setFieldValue(
                  "subCategoryId",
                  v === "" ? "" : Number(v)
                );
              }}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.subCategoryId && formik.errors.subCategoryId
              )}
              helperText={
                formik.touched.subCategoryId && formik.errors.subCategoryId
              }
              fullWidth
              sx={{ "& .MuiOutlinedInput-root": { padding: "0.7rem 0rem" } }}
            >
              {(filteredSubcategories ?? []).map((o) => (
                <MenuItem key={o.id} value={Number(o.id)}>
                  {o.nameAr}
                </MenuItem>
              ))}
            </TextField>

            <Stack direction="row" spacing={3}>
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(formik.values.hasDelivery)}
                    onChange={(e) =>
                      formik.setFieldValue("hasDelivery", e.target.checked)
                    }
                  />
                }
                label="خدمة التوصيل"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(formik.values.hasInstallation)}
                    onChange={(e) =>
                      formik.setFieldValue("hasInstallation", e.target.checked)
                    }
                  />
                }
                label="خدمة التركيب"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(formik.values.isActive)}
                    onChange={(e) =>
                      formik.setFieldValue("isActive", e.target.checked)
                    }
                  />
                }
                label="مُفعل"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={Boolean(formik.values.isFeatured)}
                    onChange={(e) =>
                      formik.setFieldValue("isFeatured", e.target.checked)
                    }
                  />
                }
                label="مميز"
              />
            </Stack>

            <div>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                الصور (حتى {MAX_IMAGES})
              </Typography>
              <TextField
                name="images"
                type="file"
                inputProps={{ accept: IMG_TYPES.join(","), multiple: true }}
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  formik.setFieldValue("images", files);
                }}
                error={Boolean(formik.touched.images && formik.errors.images)}
                helperText={formik.touched.images && formik.errors.images}
                fullWidth
              />
            </div>
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            إلغاء
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ color: "#FFF" }}
            disableElevation
            disabled={isPending || !formik.dirty}
          >
            {isPending ? (
              <CircularProgress size={22} sx={{ color: "#000" }} />
            ) : (
              "تعديل"
            )}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
