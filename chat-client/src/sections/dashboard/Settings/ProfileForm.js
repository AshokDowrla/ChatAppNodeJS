import React, { useCallback, useState } from "react";
import * as Yup from "yup";
// form
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormProvider from "../../../components/hook-form/FormProvider";
import { RHFTextField, RHFUploadAvatar } from "../../../components/hook-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserProfile } from "../../../redux/slices/app";
import { CLOUDINARY_CLOUDNAME } from "../../../config";

const ProfileForm = () => {
  const dispatch = useDispatch();

  const [file, setFile] = useState(null);

  const { user } = useSelector((state) => state.app);

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().required("Name is required"),
    about: Yup.string().required("About is required"),
    avatar: Yup.string().required("Avatar is required").nullable(true),
  });

  const defaultValues = {
    firstName: user?.firstName,
    about: user?.about,
    avatar: `https://res.cloudinary.com/${CLOUDINARY_CLOUDNAME}/image/upload/c_scale,w_300/v${user?.avatar?.version}/${user?.avatar?.public_id}.${user?.avatar?.format}`,
  };

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isSubmitSuccessful },
  } = methods;

  const values = watch();

  const onSubmit = async (data) => {
    try {
      //   Send API request
      console.log("DATA", data);
      dispatch(
        UpdateUserProfile({
          firstName: data?.firstName,
          about: data?.about,
          avatar: file,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      console.log(file);

      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setFile({ url: reader.result, type: file.type });
        };
      }
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue("avatar", newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <RHFUploadAvatar name="avatar" maxSize={3145728} onDrop={handleDrop} />

        <RHFTextField
          helperText={"This name is visible to your contacts"}
          name="firstName"
          label="First Name"
        />
        <RHFTextField multiline rows={4} name="about" label="About" />

        <Stack direction={"row"} justifyContent="end">
          <LoadingButton
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            // loading={isSubmitSuccessful || isSubmitting}
          >
            Save
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default ProfileForm;
