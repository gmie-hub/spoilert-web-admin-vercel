import { useEffect } from "react";

import { useFormikContext } from "formik";

import type { SpoilsDatum } from "@spt/types/spoils";

export const AutoFillTutor = ({ spoils }: { spoils?: SpoilsDatum[] | null }) => {
  const { values, setFieldValue } = useFormikContext<any>();

  useEffect(() => {
    const selected = spoils?.find(
      (s) => String(s.id) === String(values?.spoilTitle)
    );

    if (selected) {
      const tutor = `${selected.tutor?.first_name} ${selected.tutor?.last_name}`;
      setFieldValue("tutorName", tutor);
    } else {
      // clear tutorName when no spoil selected
      setFieldValue("tutorName", "");
    }
  }, [values?.spoilTitle, spoils, setFieldValue]);

  return null;
};
