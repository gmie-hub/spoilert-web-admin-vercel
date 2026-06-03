import { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Separator,
  Stack,
  Text,
} from "@chakra-ui/react";
import { HiOutlineBan, HiOutlineEye, HiOutlineRefresh } from "react-icons/hi";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Breadcrumb, Card, ConfirmDialog, SuccessDialog } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import { useToggleSpoilStatusMutation } from "@spt/hooks/api/useToggleSpoilStatusMutation";
import InfoDisplay from "@spt/partials/infoDisplay";
import { routes } from "@spt/routes";
import type { ReportTimelineEntry, ReportedSpoil } from "@spt/types/report";
import { formatDate } from "@spt/utils/dateTime";

import MessageBox from "../components/messageBox";
import ReportTimeline from "../components/reportTimeline";
import { getReportedSpoilById } from "../spoilData";

const CURRENT_ADMIN = "Admin";

const ReportDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const report =
    (state as { report?: ReportedSpoil })?.report ?? getReportedSpoilById(id);

  const [timeline, setTimeline] = useState<ReportTimelineEntry[]>(
    report?.timeline ?? []
  );
  const [message, setMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(
    report?.actionTaken === "Spoylz Disabled"
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const { toggleSpoilStatus, isToggleLoading } = useToggleSpoilStatusMutation();

  if (!report) {
    return (
      <ErrorState error="No report selected. Please go back and select a report." />
    );
  }

  const addTimelineEntry = (entry: Omit<ReportTimelineEntry, "id">) =>
    setTimeline((prev) => [{ ...entry, id: Date.now() }, ...prev]);

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    addTimelineEntry({
      type: "message",
      title: "Message Sent",
      description: trimmed,
      admin: CURRENT_ADMIN,
      date: new Date().toISOString(),
    });
    setMessage("");
  };

  const handleToggleStatus = async () => {
    // When currently disabled we are re-enabling, otherwise we are disabling.
    const nextActive = isDisabled;
    try {
      await toggleSpoilStatus({ id: report.spoil.id, is_active: nextActive });
      addTimelineEntry({
        type: nextActive ? "note" : "ban",
        title: nextActive ? "Spoylz Re-enabled" : "Spoylz Disabled",
        description: nextActive
          ? `"${report.spoil.title}" has been re-enabled and is now visible to learners again.`
          : `"${report.spoil.title}" has been disabled and is no longer visible to learners.`,
        admin: CURRENT_ADMIN,
        date: new Date().toISOString(),
      });
      setIsDisabled(!nextActive);
      setConfirmOpen(false);
      setSuccessMessage(
        nextActive
          ? "This Spoil Has Been Re-enabled Successfully"
          : "This Spoil Has Been Disabled Successfully"
      );
      setSuccessOpen(true);
    } catch {
      // Error toast is handled inside the mutation.
    }
  };

  const goToTutorProfile = () =>
    navigate(
      generatePath(routes.main.tutors.tutorDetails, {
        id: report.tutor.id,
        spoil_id: undefined,
      })
    );

  const goToReporterProfile = () =>
    navigate(
      generatePath(routes.main.learners.viewDetails, {
        id: report.reportedBy.id,
        spoil_id: undefined,
      })
    );

  const goToSpoilDetails = () =>
    navigate(generatePath(routes.main.spoilMgt.spoilDetails, { id: report.spoil.id }));

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Reported Spoylz"
        currentLink="View Report Details"
        previousHref={routes.main.reports.reportedSpoylz.home}
      />

      <Card>
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: "6", lg: "0" }}
        >
          {/* Left: Report Details */}
          <Stack flex="1" gap="6" pe={{ lg: "8" }} order={{ base: 2, lg: 1 }}>
            <Heading size={{ base: "md", md: "lg" }}>Report Details</Heading>

            <Stack gap="2">
              <Flex justify="space-between" rowGap="4" wrap="wrap">
                <Stack
                  flex={{ base: "1 0 50%", md: "0 0 50%" }}
                  align="flex-start"
                >
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
                    Name of Tutor
                  </Text>
                  <Text fontSize={{ base: "md", md: "lg" }}>
                    {report.tutor.name}
                  </Text>
                  <Button
                    variant="yellowOutline"
                    size="sm"
                    px="3"
                    mt="1"
                    onClick={goToTutorProfile}
                  >
                    <Icon as={HiOutlineEye} /> View Tutor's Profile
                  </Button>
                </Stack>

                <Stack
                  flex={{ base: "1 0 50%", md: "0 0 50%" }}
                  align="flex-start"
                >
                  <Text fontSize={{ base: "sm", md: "md" }} color="gray.100">
                    Reported By
                  </Text>
                  <Text fontSize={{ base: "md", md: "lg" }}>
                    {report.reportedBy.name}
                  </Text>
                  <Button
                    variant="yellowOutline"
                    size="sm"
                    px="3"
                    mt="1"
                    onClick={goToReporterProfile}
                  >
                    <Icon as={HiOutlineEye} /> View Profile
                  </Button>
                </Stack>
              </Flex>

              <Separator />
            </Stack>

            <Stack gap="2">
              <Flex justify="space-between" rowGap="4" wrap="wrap">
                <InfoDisplay
                  title="Report Reason"
                  value={report.reason}
                  flex={{ base: "1 0 50%", md: "0 0 50%" }}
                />
                <InfoDisplay
                  title="Date Reported"
                  value={formatDate(report.dateReported)}
                  flex={{ base: "1 0 50%", md: "0 0 50%" }}
                />
              </Flex>

              <Separator />
            </Stack>

            <Box>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.100" mb="2">
                Report Description
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                {report.description}
              </Text>
            </Box>
          </Stack>

          {/* Right: Actions & Timeline */}
          <Stack
            w={{ base: "100%", lg: "420px" }}
            gap="5"
            order={{ base: 1, lg: 2 }}
            ps={{ lg: "8" }}
            borderInlineStartWidth={{ lg: "1px" }}
            borderColor="gray.200"
          >
            <Flex direction={{ base: "column", sm: "row" }} gap="3">
              <Button
                variant={isDisabled ? "yellowOutline" : "dangerOutline"}
                flex="1"
                onClick={() => setConfirmOpen(true)}
              >
                <Icon as={isDisabled ? HiOutlineRefresh : HiOutlineBan} />{" "}
                {isDisabled ? "Re-enable Spoil" : "Disable Spoil"}
              </Button>

              <Button variant="yellow" flex="1" onClick={goToSpoilDetails}>
                <Icon as={HiOutlineEye} /> View Spoil Details
              </Button>
            </Flex>

            <Heading size="sm">Action Taken and Report Timeline</Heading>

            <MessageBox
              value={message}
              onChange={setMessage}
              onSend={handleSendMessage}
            />

            <ReportTimeline entries={timeline} />
          </Stack>
        </Flex>
      </Card>

      <ConfirmDialog
        open={confirmOpen}
        title={
          isDisabled
            ? "Are you sure you want to re-enable this spoil?"
            : "Are you sure you want to disable this spoil?"
        }
        description={
          isDisabled
            ? "This spoil will be visible to learners once you re-enable it"
            : "This spoil will be hidden from learners until you re-enable it"
        }
        confirmLabel={isDisabled ? "Yes, Re-enable" : "Yes, Disable"}
        loading={isToggleLoading}
        onOpenChange={setConfirmOpen}
        onConfirm={handleToggleStatus}
      />

      <SuccessDialog
        open={successOpen}
        message={successMessage}
        onOpenChange={setSuccessOpen}
      />
    </Stack>
  );
};

export default ReportDetails;
