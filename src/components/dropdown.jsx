import React from 'react';

const dropdown = () => {
    return (
      <div>
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <IconButton>
              <EllipsisHorizontal />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item className="gap-x-2">
              <PencilSquare className="text-ui-fg-subtle" />
              Edit
            </DropdownMenu.Item>
            <DropdownMenu.Item className="gap-x-2">
              <Plus className="text-ui-fg-subtle" />
              Add
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item className="gap-x-2">
              <Trash className="text-ui-fg-subtle" />
              Delete
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      </div>
    );
};

export default dropdown;