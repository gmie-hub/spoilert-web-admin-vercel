import { type FC } from "react";

import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { HiOutlinePlus } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import { DeleteDialog, NoData } from "@spt/components";
import { routes } from "@spt/routes";
import { useCreateSpolyzStore } from "@spt/store/createSpolyzStore";

import AddLessonModal from "./addLessonModal";
import AddModuleModal from "./addModuleModal";
import OutlineModuleCard from "./outlineModuleCard";
import OutlineQuizPanel from "./outlineQuizPanel";
import { useOutlineEditor } from "./useOutlineEditor";

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
  const setAdvancedStep = useCreateSpolyzStore((s) => s.setAdvancedStep);

  const {
    modules,
    moduleModalOpen,
    lessonModalOpen,
    editingModule,
    editingLesson,
    pendingDelete,
    deleteCopy,
    openModuleModal,
    setModuleModal,
    openLessonModal,
    setLessonModal,
    saveModule,
    saveLesson,
    requestDeleteModule,
    requestDeleteLesson,
    confirmDelete,
    cancelDelete,
  } = useOutlineEditor();

  if (!advancedDraft) return null;

  const openQuizPage = (path: string) => {
    setAdvancedStep("outline");
    navigate(path);
  };

  const hasModules = modules.length > 0;

  return (
    <>
      <Stack gap="6">
        <Flex align="center" justify="space-between" gap="3">
          <Text fontSize="md" fontWeight="semibold">
            Spoylz Outline
          </Text>

          {hasModules && (
            <Button
              variant="yellowOutline"
              size="sm"
              px="4"
              py="2"
              fontSize="sm"
              flexShrink={0}
              onClick={() => openModuleModal()}
            >
              <HStack gap="2">
                <HiOutlinePlus size={16} />
                <Text>Add Module</Text>
              </HStack>
            </Button>
          )}
        </Flex>

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
              contentWidth={{ md: "35%", lg: "100%" }}
            />
          ) : (
            <Stack gap="4">
              {modules.map((module, index) => (
                <OutlineModuleCard
                  key={module.id}
                  module={module}
                  index={index}
                  onAddLesson={() => openLessonModal(module.id)}
                  onEditLesson={(lesson) => openLessonModal(module.id, lesson)}
                  onDeleteLesson={(lesson) =>
                    requestDeleteLesson(module.id, lesson)
                  }
                  onEditModule={() => openModuleModal(module.id)}
                  onDeleteModule={() => requestDeleteModule(module)}
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
          {!hasModules && (
            <Button variant="yellow" w="full" onClick={() => openModuleModal()}>
              Add Module
            </Button>
          )}

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
        title={editingModule ? "Edit Module" : "Add Module"}
        initialValues={
          editingModule
            ? {
                title: editingModule.title,
                description: editingModule.description,
              }
            : undefined
        }
        onOpenChange={setModuleModal}
        onSave={saveModule}
      />

      <AddLessonModal
        open={lessonModalOpen}
        title={editingLesson ? "Edit Lesson" : "Add Lesson"}
        initialValues={
          editingLesson
            ? {
                title: editingLesson.title,
                type: editingLesson.type,
                content: editingLesson.content,
                content_file: editingLesson.content_file ?? null,
              }
            : undefined
        }
        onOpenChange={setLessonModal}
        onSave={saveLesson}
      />

      <DeleteDialog
        open={Boolean(pendingDelete)}
        itemName={deleteCopy.itemName}
        description={deleteCopy.description}
        onOpenChange={(open) => {
          if (!open) cancelDelete();
        }}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default SpolyzOutlineStep;
