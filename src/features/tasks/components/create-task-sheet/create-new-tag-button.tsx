import { LoadingButton } from "@/components/ui/loading-button";
import { Button } from "@/components/ui/primitives/button";
import { Input } from "@/components/ui/primitives/input";
import { useState } from "react";
import { TAG_STYLES, TagStyle } from "../../constants";
import { useCreateTag } from "../../hooks/use-create-tag";
import { ColorPicker } from "./color-picker";

export const CreateNewTagButton = ({ projectId }: { projectId: string }) => {
  const [newTagName, setNewTagName] = useState("");
  const [tagStyle, setTagStyle] = useState<TagStyle>(TAG_STYLES[0]); // default - blue
  const [isAddingTagFormDisplayed, setIsAddingTagFormDisplayed] =
    useState(false);
  const { mutate: createTagMutate, isPending: isCreatingTagPending } =
    useCreateTag({
      projectId,
      onSetNewTagName: setNewTagName,
      onSetIsAddingTag: setIsAddingTagFormDisplayed,
    });

  const handleAddTag = async () => {
    if (!newTagName) return;

    createTagMutate({
      name: newTagName,
      styleId: tagStyle.id,
      projectId,
    });
  };

  return isAddingTagFormDisplayed ? (
    <div className="flex items-center gap-2">
      <Input
        placeholder="New tag name"
        value={newTagName}
        onChange={(e) => setNewTagName(e.target.value)}
        className="flex-1 h-9"
        autoFocus
      />
      <ColorPicker
        projectId={projectId}
        style={tagStyle}
        onStyleSelect={setTagStyle}
      />
      <div className="gap-2 grid grid-cols-2">
        <LoadingButton
          loading={isCreatingTagPending}
          size="sm"
          variant="secondary"
          onClick={handleAddTag}
          type="button"
          className="rounded-lg"
        >
          {isCreatingTagPending ? "Adding..." : "Add"}
        </LoadingButton>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsAddingTagFormDisplayed(false)}
          type="button"
          className="rounded-lg"
        >
          Cancel
        </Button>
      </div>
    </div>
  ) : (
    <Button
      size="sm"
      variant="outline"
      onClick={() => setIsAddingTagFormDisplayed(true)}
      type="button"
    >
      + Create new tag
    </Button>
  );
};
