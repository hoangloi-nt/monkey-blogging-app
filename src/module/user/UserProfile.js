import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Field } from "../../components/field";
import ImageUpload from "../../components/image/ImageUpload";
import { Input } from "../../components/input";
import { Label } from "../../components/label";
import DashboardHeading from "../../drafts/DashboardHeading";
import React, { useEffect } from "react";
import useFirebaseImage from "../../hooks/useFirebaseImage";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { useAuth } from "../../contexts/auth-context";
import { toast } from "react-toastify";

const UserProfile = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });

  const { userInfo } = useAuth();
  console.log(userInfo);
  const imageUrl = getValues("avatar");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";

  const { image, setImage, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues, imageName, deleteAvatar);

  const handleUpdateUser = async (values) => {
    if (!isValid) return;
    // eslint-disable-next-line eqeqeq
    if (values.password != values.confirmPassword) {
      toast.error("Confirm password is not correct!");
      return;
    }
    if (!values.password && !values.confirmPassword) {
      try {
        const colRef = doc(db, "users", userInfo.uid);
        const docData = await getDoc(colRef);
        await updateDoc(colRef, {
          ...values,
          password: docData.data().password,
          confirmPassword: docData.data().confirmPassword,
          avatar: image,
        });
        toast.success("Update information successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Update failed!");
      }
    } else {
      try {
        const colRef = doc(db, "users", userInfo.uid);
        await updateDoc(colRef, {
          ...values,
          avatar: image,
        });
        toast.success("Update information successfully!");
      } catch (error) {
        console.log(error);
        toast.error("Update failed!");
      }
    }
  };

  async function deleteAvatar() {
    const colRef = collection(db, "users", userInfo.uid);
    await updateDoc(colRef, {
      avatar: "",
    });
  }

  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  useEffect(() => {
    if (!userInfo.uid) return;
    async function fetchData() {
      const colRef = doc(db, "users", userInfo.uid);
      const docData = await getDoc(colRef);
      reset(docData && docData.data());
      setValue("password", "");
      setValue("confirmPassword", "");
    }
    fetchData();
  }, [reset, setValue, userInfo.uid]);

  if (!userInfo.uid) return null;
  return (
    <div>
      <DashboardHeading
        title="Account information"
        desc="Update your account information"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateUser)}>
        <div className="w-[200px] h-[200px] mx-auto rounded-full mb-10">
          <ImageUpload
            className="!rounded-full h-full"
            onChange={handleSelectImage}
            image={image}
            progress={progress}
            handleDeleteImage={handleDeleteImage}
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              control={control}
              name="fullname"
              placeholder="Enter your fullname"
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              control={control}
              name="username"
              placeholder="Enter your username"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Date of Birth</Label>
            <Input
              control={control}
              name="birthday"
              placeholder="dd/mm/yyyy"
            ></Input>
          </Field>
          <Field>
            <Label>Mobile Number</Label>
            <Input
              control={control}
              name="phone"
              placeholder="Enter your phone number"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              control={control}
              name="email"
              type="email"
              placeholder="Enter your email address"
            ></Input>
          </Field>
          <Field></Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>New Password</Label>
            <Input
              control={control}
              name="password"
              type="password"
              placeholder="Enter your password"
            ></Input>
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              control={control}
              name="confirmPassword"
              type="password"
              placeholder="Enter your confirm password"
            ></Input>
          </Field>
        </div>
        <Button
          type="submit"
          kind="primary"
          className="mx-auto w-[200px]"
          style={{ width: "100%", maxWidth: 200, margin: "0 auto" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
