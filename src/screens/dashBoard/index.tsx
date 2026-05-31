
import { Box, Grid } from "@chakra-ui/react";

import CoursesSection from "./coursesSection";
import LearnerTutorSignupsChart from "./learnerTutorSignupsChart";
import StatsSection from "./statsSection";
import UserRegistrationsChart from "./userRegistrationsChart";

export default function FirstSection() {
  return (
    <Grid 
      templateColumns={{ base: "1fr", lg: "1fr 1fr" }} 
      gap={6} 
      p={4} 
      width="100%"  // Ensures the grid spans the full width
    >
      {/* Left Column: Stats + Charts */}
      <Box display="flex" flexDirection="column" gap={6} flex="1" minWidth="0">
        <StatsSection />
          
        <LearnerTutorSignupsChart />
        
      </Box>

      {/* Right Column: Courses + Registrations */}
      <Box display="flex" flexDirection="column" gap={6} flex="1" minWidth="0">
        <CoursesSection />
        <UserRegistrationsChart />
      </Box>
    </Grid>
  );
}

