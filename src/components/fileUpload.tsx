import { Button, FileUpload, type UseFileUploadReturn } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

const CustomFileUpload = ({ fileUpload }: { fileUpload: UseFileUploadReturn }) => {
  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.HiddenInput />
      <FileUpload.Trigger asChild>
        <Button variant="outline" size="sm">
          <HiUpload /> Upload file
        </Button>
      </FileUpload.Trigger>
      <FileUpload.List />
    </FileUpload.RootProvider>
  );
};

export default CustomFileUpload;