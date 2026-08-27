import { useState } from "react";

import {
  type AdvancedLessonDraft,
  type AdvancedModuleDraft,
  createId,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";

import type { AddLessonSaveValues } from "./addLessonModal";

type PendingDelete =
  | { type: "module"; moduleId: string; title: string }
  | { type: "lesson"; moduleId: string; lessonId: string; title: string };

const deleteCopyFor = (pending: PendingDelete | null) =>
  pending?.type === "module"
    ? {
        itemName: "Module",
        description:
          "This module and every lesson inside it will be removed. You won't be able to recover it once it is deleted",
      }
    : { itemName: "Lesson", description: undefined };

/**
 * Owns the module and lesson editing state for the advanced Spoylz outline —
 * which modal is open, what is being edited, and the draft writes behind them.
 */
export const useOutlineEditor = () => {
  const advancedDraft = useCreateSpolyzStore((s) => s.advancedDraft);
  const setAdvancedDraft = useCreateSpolyzStore((s) => s.setAdvancedDraft);

  const [moduleModalOpen, setModuleModalOpen] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(
    null,
  );

  const modules = advancedDraft?.modules ?? [];

  const updateModules = (nextModules: AdvancedModuleDraft[]) => {
    if (!advancedDraft) return;
    setAdvancedDraft({ ...advancedDraft, modules: nextModules });
  };

  const editingModule =
    modules.find((module) => module.id === editingModuleId) ?? null;

  const editingLesson =
    modules
      .find((module) => module.id === activeModuleId)
      ?.lessons.find((lesson) => lesson.id === editingLessonId) ?? null;

  const openModuleModal = (moduleId?: string) => {
    setEditingModuleId(moduleId ?? null);
    setModuleModalOpen(true);
  };

  const setModuleModal = (open: boolean) => {
    setModuleModalOpen(open);
    if (!open) setEditingModuleId(null);
  };

  const openLessonModal = (moduleId: string, lesson?: AdvancedLessonDraft) => {
    setActiveModuleId(moduleId);
    setEditingLessonId(lesson?.id ?? null);
    setLessonModalOpen(true);
  };

  const setLessonModal = (open: boolean) => {
    setLessonModalOpen(open);
    if (!open) {
      setActiveModuleId(null);
      setEditingLessonId(null);
    }
  };

  const saveModule = (values: { title: string; description: string }) => {
    if (editingModuleId) {
      updateModules(
        modules.map((module) =>
          module.id === editingModuleId ? { ...module, ...values } : module,
        ),
      );
      return;
    }

    updateModules([
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

  const saveLesson = (values: AddLessonSaveValues) => {
    if (!activeModuleId) return;

    updateModules(
      modules.map((module) => {
        if (module.id !== activeModuleId) return module;

        if (editingLessonId) {
          return {
            ...module,
            lessons: module.lessons.map((lesson) =>
              lesson.id === editingLessonId ? { ...lesson, ...values } : lesson,
            ),
          };
        }

        return {
          ...module,
          lessons: [...module.lessons, { id: createId(), ...values }],
        };
      }),
    );
  };

  const requestDeleteModule = (module: AdvancedModuleDraft) => {
    setPendingDelete({
      type: "module",
      moduleId: module.id,
      title: module.title,
    });
  };

  const requestDeleteLesson = (
    moduleId: string,
    lesson: AdvancedLessonDraft,
  ) => {
    setPendingDelete({
      type: "lesson",
      moduleId,
      lessonId: lesson.id,
      title: lesson.title,
    });
  };

  const confirmDelete = () => {
    if (!pendingDelete) return;

    if (pendingDelete.type === "module") {
      updateModules(
        modules.filter((module) => module.id !== pendingDelete.moduleId),
      );
    } else {
      updateModules(
        modules.map((module) =>
          module.id === pendingDelete.moduleId
            ? {
                ...module,
                lessons: module.lessons.filter(
                  (lesson) => lesson.id !== pendingDelete.lessonId,
                ),
              }
            : module,
        ),
      );
    }

    setPendingDelete(null);
  };

  return {
    modules,
    moduleModalOpen,
    lessonModalOpen,
    editingModule,
    editingLesson,
    pendingDelete,
    deleteCopy: deleteCopyFor(pendingDelete),
    openModuleModal,
    setModuleModal,
    openLessonModal,
    setLessonModal,
    saveModule,
    saveLesson,
    requestDeleteModule,
    requestDeleteLesson,
    confirmDelete,
    cancelDelete: () => setPendingDelete(null),
  };
};
