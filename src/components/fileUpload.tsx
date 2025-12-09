// import { Button, FileUpload, type UseFileUploadReturn } from "@chakra-ui/react";
// import { HiUpload } from "react-icons/hi";

// const CustomFileUpload = ({ fileUpload }: { fileUpload: UseFileUploadReturn }) => {
//   return (
//     <FileUpload.RootProvider value={fileUpload}>
//       <FileUpload.HiddenInput />
//       <FileUpload.Trigger asChild>
//         <Button variant="outline" size="sm">
//           <HiUpload /> Upload file
//         </Button>
//       </FileUpload.Trigger>
//       <FileUpload.List />
//     </FileUpload.RootProvider>
//   );
// };

// export default CustomFileUpload;
import { Button, FileUpload, type UseFileUploadReturn } from "@chakra-ui/react";
import { HiUpload } from "react-icons/hi";

const CustomFileUpload = ({
  fileUpload,
  onChange,
}: {
  fileUpload: UseFileUploadReturn;
  onChange?: (file: File | null) => void;
}) => {
  return (
    <FileUpload.RootProvider value={fileUpload}>
      <FileUpload.HiddenInput
        onChange={(e) => {
          const files = e.target.files;
          if (files && files[0]) {
            onChange?.(files[0]); 
          } else {
            onChange?.(null);
          }
        }}
      />
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
