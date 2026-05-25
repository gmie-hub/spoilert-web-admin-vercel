import { useEffect, useState, type FC } from "react";

import { Box, Image, Stack } from "@chakra-ui/react";

import InfoDisplay from "@spt/partials/infoDisplay";
import ProgressInfo from "@spt/partials/progressInfo";
import type { Promotion, PromotionPackage } from "@spt/types/promotion";

interface OverviewProps {
  promotion?: Promotion;
  promotionPackage?: PromotionPackage;
}

const formatAmount = (amount?: string | number) => {
  if (amount == null) return "";
  const value = Number(amount);
  if (Number.isNaN(value)) return String(amount);
  return `₦${value.toLocaleString()}`;
};

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

const getTimeLeft = (endDate?: string) => {
  if (!endDate) return "";
  const end = new Date(endDate.replace(" ", "T")).getTime();
  if (Number.isNaN(end)) return "";

  let diff = end - Date.now();
  if (diff <= 0) return "Expired";

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;
  const second = 1000;

  const days = Math.floor(diff / day);
  diff -= days * day;
  const hours = Math.floor(diff / hour);
  diff -= hours * hour;
  const minutes = Math.floor(diff / minute);
  diff -= minutes * minute;
  const seconds = Math.floor(diff / second);

  return `${days}d:${hours}h:${minutes}m:${seconds}s left`;
};

const useTimeLeft = (endDate?: string) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));

  useEffect(() => {
    setTimeLeft(getTimeLeft(endDate));

    if (!endDate) return;

    const intervalId = setInterval(() => {
      const next = getTimeLeft(endDate);
      setTimeLeft(next);
      if (next === "Expired") clearInterval(intervalId);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [endDate]);

  return timeLeft;
};

const PromotionManagementOverview: FC<OverviewProps> = ({
  promotion,
  promotionPackage,
}) => {
  const timeLeft = useTimeLeft(promotion?.end_date);

  const tutorName = promotion?.spoil?.tutor
    ? `${promotion.spoil.tutor.first_name} ${promotion.spoil.tutor.last_name}`
    : "";

  const packageName =
    promotionPackage?.name ?? String(promotion?.promotion_package_id ?? "");

  const duration = promotionPackage
    ? `${promotionPackage.duration} ${
        Number(promotionPackage.duration) === 1 ? "day" : "days"
      }`
    : "";

  return (
    <Stack gap="4" mt="2">
      <Box h="80px" w="80px">
        <Image
          src={promotion?.spoil?.cover_image_url || "/spoil.svg"}
          alt="spoil"
          w="inherit"
          h="inherit"
          objectFit="cover"
          borderRadius="md"
        />
      </Box>

      <Stack gap="4">
        <ProgressInfo>
          <InfoDisplay title="Spoil Title" value={promotion?.spoil?.title} />
          <InfoDisplay title="Name of Tutor" value={tutorName} />
          <InfoDisplay title="Promotion Package" value={packageName} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Duration" value={duration} />
          <InfoDisplay title="Amount" value={formatAmount(promotion?.amount)} />
          <InfoDisplay title="Time Left" value={timeLeft} />
        </ProgressInfo>

        <ProgressInfo>
          <InfoDisplay title="Start Date" value={formatDate(promotion?.start_date)} />
          <InfoDisplay title="End Date" value={formatDate(promotion?.end_date)} />
          <InfoDisplay title="Status" value={promotion?.status} />
        </ProgressInfo>
      </Stack>
    </Stack>
  );
};

export default PromotionManagementOverview;
