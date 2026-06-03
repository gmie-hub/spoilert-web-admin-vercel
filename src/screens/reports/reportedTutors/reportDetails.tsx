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
import { HiOutlineBan, HiOutlineEye } from "react-icons/hi";
import {
  generatePath,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import { Breadcrumb, Card, ConfirmDialog, SuccessDialog } from "@spt/components";
import ErrorState from "@spt/components/errorState";
import InfoDisplay from "@spt/partials/infoDisplay";
import { routes } from "@spt/routes";
import type { ReportTimelineEntry, ReportedTutor } from "@spt/types/report";
import { formatDate } from "@spt/utils/dateTime";

import MessageBox from "../components/messageBox";
import ReportTimeline from "../components/reportTimeline";
import { getReportById } from "../data";

const CURRENT_ADMIN = "Admin";

const ReportDetails = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const report =
    (state as { report?: ReportedTutor })?.report ?? getReportById(id);

  const [timeline, setTimeline] = useState<ReportTimelineEntry[]>(
    report?.timeline ?? []
  );
  const [message, setMessage] = useState("");
  const [isBanned, setIsBanned] = useState(
    report?.actionTaken === "Tutor Banned"
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleConfirmBan = () => {
    addTimelineEntry({
      type: "ban",
      title: "Tutor Banned",
      description: `${report.tutor.name} has been banned from the platform following this report.`,
      admin: CURRENT_ADMIN,
      date: new Date().toISOString(),
    });
    setIsBanned(true);
    setConfirmOpen(false);
    setSuccessMessage("This Tutor Has Been Banned Successfully");
    setSuccessOpen(true);
  };

  const handleLiftBan = () => {
    addTimelineEntry({
      type: "note",
      title: "Ban Lifted",
      description: `The ban on ${report.tutor.name} has been lifted and their access to the platform restored.`,
      admin: CURRENT_ADMIN,
      date: new Date().toISOString(),
    });
    setIsBanned(false);
    setConfirmOpen(false);
    setSuccessMessage("The Ban on This Tutor Has Been Lifted Successfully");
    setSuccessOpen(true);
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

  return (
    <Stack gap="4">
      <Breadcrumb
        previousLink="Reported Tutors"
        currentLink="View Report Details"
        previousHref={routes.main.reports.reportedTutors.home}
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
                <InfoDisplay
                  title="Name of Tutor"
                  value={report.tutor.name}
                  flex={{ base: "1 0 50%", md: "0 0 50%" }}
                />

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
                variant={isBanned ? "yellowOutline" : "dangerOutline"}
                flex="1"
                onClick={() => setConfirmOpen(true)}
              >
                <Icon as={HiOutlineBan} />{" "}
                {isBanned ? "Lift Ban on Tutor" : "Ban Tutor"}
              </Button>

              <Button variant="yellow" flex="1" onClick={goToTutorProfile}>
                <Icon as={HiOutlineEye} /> View Tutor's Profile
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
          isBanned
            ? "Are you sure you want to lift the ban on this tutor?"
            : "Are you sure you want to ban this tutor?"
        }
        description={
          isBanned
            ? "This tutor will regain access to the platform once the ban is lifted"
            : "This tutor will lose access to the platform once banned"
        }
        confirmLabel={isBanned ? "Yes, Lift Ban" : "Yes, Ban Tutor"}
        onOpenChange={setConfirmOpen}
        onConfirm={isBanned ? handleLiftBan : handleConfirmBan}
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
