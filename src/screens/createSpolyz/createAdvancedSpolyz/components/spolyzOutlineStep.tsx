import { type FC, useState } from "react";

import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { NoData } from "@spt/components";
import { routes } from "@spt/routes";
import {
  type AdvancedModuleDraft,
  createId,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

import AddLessonModal, { type AddLessonSaveValues } from "./addLessonModal";
import AddModuleModal from "./addModuleModal";
import OutlineModuleCard from "./outlineModuleCard";
import OutlineQuizPanel from "./outlineQuizPanel";

interface SpolyzOutlineStepProps {
  onPrevious: () => void;
  onContinue: () => void;
}

const SpolyzOutlineStep: FC<SpolyzOutlineStepProps> = ({
  onPrevious,
  onContinue,
}) => {
  const navigate = useNavigate();
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const setAdvancedDraft = useCreateSpolyzStore((s) => s.setAdvancedDraft);
  const setAdvancedStep = useCreateSpolyzStore((s) => s.setAdvancedStep);

  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  if (!advancedDraft) return null;

  const modules = advancedDraft.modules;

  const updateDraft = (nextModules: AdvancedModuleDraft[]) => {
    setAdvancedDraft({ ...advancedDraft, modules: nextModules });
  };

  const handleAddModule = (values: { title: string; description: string }) => {
    updateDraft([
      ...modules,
      {
        id: createId(),
        title: values.title,
        description: values.description,
        lessons: [],
        quiz: null,
      },
    ]);
  };

  const handleAddLesson = (values: AddLessonSaveValues) => {
    if (!activeModuleId) return;

    updateDraft(
      modules.map((module) =>
        module.id === activeModuleId
          ? {
              ...module,
              lessons: [
                ...module.lessons,
                {
                  id: createId(),
                  title: values.title,
                  type: values.type,
                  content: values.content,
                  content_file: values.content_file,
                },
              ],
            }
          : module,
      ),
    );
    setActiveModuleId(null);
  };

  const openQuizPage = (path: string) => {
    setAdvancedStep("outline");
    navigate(path);
  };

  const hasModules = modules.length > 0;

  return (
    <>
      <Stack gap="6">
        <Text fontSize="md" fontWeight="semibold">
          Spoylz Outline
        </Text>

        <OutlineQuizPanel
          preQuiz={advancedDraft.pre_quiz}
          postQuiz={advancedDraft.post_quiz}
          onOpenPreQuiz={() =>
            openQuizPage(routes.main.createSpolyz.advancedQuiz.pre)
          }
          onOpenPostQuiz={() =>
            openQuizPage(routes.main.createSpolyz.advancedQuiz.post)
          }
        />

        <Stack gap="3">
          <Text fontSize="sm" color="gray.600">
            Break down your Spoylz outline into modules and lessons.
          </Text>

          {!hasModules ? (
            <NoData
              heading="No Spoylz Module Has Been Added Yet"
              description="Add modules and lessons to each module to create a proper module outline."
            />
          ) : (
            <Stack gap="4">
              {modules.map((module, index) => (
                <OutlineModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  onAddLesson={() => {
                    setActiveModuleId(module.id);
                    setLessonModalOpen(true);
                  }}
                  onOpenQuiz={() =>
                    openQuizPage(
                      routes.main.createSpolyz.advancedQuiz.module.replace(
                        ":moduleId",
                        module.id,
                      ),
                    )
                  }
                />
              ))}
            </Stack>
          )}
        </Stack>

        <Stack gap="3">
          <Button
            variant="yellow"
            w="full"
            onClick={() => setModuleModalOpen(true)}
          >
            Add Module
          </Button>

          <Flex gap="3" direction={{ base: "column", sm: "row" }}>
            <Button variant="yellowOutline" flex="1" onClick={onPrevious}>
              Previous
            </Button>

            {hasModules && (
              <Button variant="yellow" flex="1" onClick={onContinue}>
                Save and continue
              </Button>
            )}
          </Flex>
        </Stack>
      </Stack>

      <AddModuleModal
        open={moduleModalOpen}
        onOpenChange={setModuleModalOpen}
        onSave={handleAddModule}
      />

      <AddLessonModal
        open={lessonModalOpen}
        onOpenChange={(open) => {
          setLessonModalOpen(open);
          if (!open) setActiveModuleId(null);
        }}
        onSave={handleAddLesson}
      />
    </>
  );
};

export default SpolyzOutlineStep;
