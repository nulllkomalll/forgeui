import { useState } from "react";
import { DocLayout } from "../components/docs/DocLayout";
import { Modal } from "../components/ui/Modal";
import { Button } from "../components/ui/Button";
import { getComponentDoc } from "../data/componentDocs";

const doc = getComponentDoc("modal")!;

const usage = `const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Delete project?"
  footer={
    <>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button variant="destructive" onClick={handleDelete}>Delete</Button>
    </>
  }
>
  This action cannot be undone.
</Modal>`;

export default function ModalDocs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DocLayout
      doc={doc}
      usageCode={usage}
      preview={
        <>
          <Button onClick={() => setIsOpen(true)}>Delete project</Button>
          <Modal
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Delete project?"
            footer={
              <>
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={() => setIsOpen(false)}>
                  Delete
                </Button>
              </>
            }
          >
            This will permanently delete the project and all of its data. This action cannot be
            undone.
          </Modal>
        </>
      }
    />
  );
}
